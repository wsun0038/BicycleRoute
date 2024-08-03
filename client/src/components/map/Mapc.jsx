import React, { useState, useEffect } from 'react'
import css from './Mapc.module.scss'
import { MapContainer, TileLayer, Marker, useMap, GeoJSON } from 'react-leaflet'
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import LoadSuburbTask from '../../tasks/LoadSuburbTask'
import { motion } from 'framer-motion'
import { fadeIn, staggerContainer } from '../../utils/motion'

const Legend = () => {
    const map = useMap();

    useEffect(() => {
        const legend = L.control({ position: 'bottomright' });

        legend.onAdd = function () {
            const div = L.DomUtil.create('div', 'info legend');
            div.style.padding = '6px 8px';
            div.style.background = 'rgba(255, 255, 255, 0.8)';
            div.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.2)';
            div.style.border = '2px solid #bbb';
            div.style.borderRadius = '5px';

            const grades = [0, 100, 200, 300, 400, 500, 600, 700, 800, 2000];
            const colors = [
                '#ccffcc',
                '#98fb98',
                '#90ee90',
                '#ffff66',
                '#fff200',
                '#ffd700',
                '#fc8d59',
                '#e34a33',
                '#b30000',
                '#8b0000'
            ];
            let labels = [];

            // Generate a label with a colored square for each interval
            for (let i = 0; i < grades.length; i++) {
                labels.push(
                    `<i style="background: ${colors[i]}; width: 18px; height: 18px; float: left; margin-right: 8px; opacity: 0.7;"></i> ${grades[i] + (grades[i + 1] ? `&ndash;${grades[i + 1]}` : '+')
                    }`
                );
            }

            div.innerHTML = labels.join('<br>');
            return div;
        };

        legend.addTo(map);

        return () => {
            legend.remove();
        };
    }, [map]);

    return null;
};





const Mapc = () => {
    const [suburbs, setSuburbs] = useState([]);
    const [selectedSuburb, setSelectedSuburb] = useState('');
    const [suburbData, setSuburbData] = useState(null);
    const [mergedData, setMergedData] = useState([]);
    const [severityData, setSeverityData] = useState([]);

    const load = () => {
        const loadSuburbTask = new LoadSuburbTask();
        loadSuburbTask.load(setSuburbs);
    };

    useEffect(load, []);

    //console.log(suburbs);

    useEffect(() => {
        if (suburbs.length > 0) {
            fetchSuburbData();
        }
    }, [suburbs])

    const getColor = (count) => {
        if (count > 2000) return '#8b0000'; // dark red (blackish red)
        if (count > 600) {
            if (count > 800) return '#b30000'; // deeper red
            if (count > 700) return '#e34a33'; // medium red
            return '#fc8d59'; // lighter red
        }
        if (count > 300) {
            if (count > 500) return '#ffd700'; // darker yellow
            if (count > 400) return '#fff200'; // bright yellow
            return '#ffff66'; // light yellow
        }
        if (count > 200) return '#90ee90'; // light green
        if (count > 100) return '#98fb98'; // lighter green
        return '#ccffcc'; // very light green
    };

    const style = (feature) => {
        const count = feature.properties.count || 0;
        return {
            fillColor: getColor(count),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    };

    const onEachSuburb = (suburb, layer) => {
        //layer.options.fillColor = 
        const name = suburb.properties.vic_loca_2;
        const count = suburb.properties.count;
        layer.on('click', () => {
            setSelectedSuburb(name);
            fetchSeverityData(name);
        });
        layer.bindPopup(`<strong>${name}</strong><br>Accident Count: ${count}`)
    }

    const fetchSuburbData = async (name) => {
        try {
            const response = await fetch('/api/suburb_counts');
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            const data = await response.json();
            setSuburbData(data);
            mergeDataWithGeoJson(suburbs, data);
        } catch (err) {
            console.error('Error fetching suburb data:', err);
        }
    };

    const fetchSeverityData = async (suburbName) => {
        try {
            const response = await fetch(`/api/severity/${suburbName}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();

            // Ensure all severity levels are present
            const severityLevels = [1, 2, 3, 4]; // assuming severities are from 1 to 4
            const formattedData = severityLevels.map(level => ({
                severity: level,
                count: data.find(item => item.severity === level)?.count || 0
            }));

            setSeverityData(formattedData);
        } catch (error) {
            console.error("Failed to fetch severity data:", error);
        }
    };

    const barChartData = {
        labels: ['Severity 1', 'Severity 2', 'Severity 3', 'Severity 4'],
        datasets: [
            {
                label: 'Number of Accidents',
                data: severityData.map(item => item.count),
                backgroundColor: [
                    'rgba(12, 92, 5, 0.2)',
                    'rgba(255, 215, 0 , 0.2)',
                    'rgba(227, 74, 51, 0.2)',
                    'rgba(92, 16, 5, 0.2)'
                ],
                borderColor: [
                    'rgba(12, 92, 5, 1)',
                    'rgba(255, 215, 0, 1)',
                    'rgba(227, 74, 51, 1)',
                    'rgba(92, 16, 5, 1)'
                ],
                borderWidth: 1
            }
        ]
    };


    const mergeDataWithGeoJson = (geoJsonData, suburbData) => {
        const updatedGeoJson = geoJsonData.map((feature) => {
            const suburbName = feature.properties.vic_loca_2;
            const suburbInfo = suburbData.find((item) => item.suburb.toUpperCase() === suburbName.toUpperCase());
            if (suburbInfo) {
                feature.properties.count = suburbInfo.count;
            }
            return feature;
        });
        setMergedData(updatedGeoJson);
    };

    console.log(mergedData);

    const chartOptions = {
        responsive: true, // Makes the chart responsive to the parent container's size
        maintainAspectRatio: false, // Allows the chart to fill the container height
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    display: true,
                }
            }
        }
    };

    return (
        <section className={css.wrapper}>

            {mergedData.length === 0 ? <div>Loading...</div> :
                <div className={css.container}>
                    <span className="primaryText">
                        Suburb Incident Insights
                    </span>
                    <MapContainer center={[-37.815, 144.953]} 
                    zoom={13} 
                    minZoom={12}
                    maxZoom={14}
                    style={{ height: '65vh' }}>
                        <GeoJSON data={mergedData}
                            style={style}
                            onEachFeature={onEachSuburb}
                        />
                        <TileLayer
                            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Legend />
                    </MapContainer>
                    {selectedSuburb && <div>
                        <h2>Accidents in {selectedSuburb}</h2>
                        <div className={css.chart}>
                            <Bar
                                key={selectedSuburb}
                                data={barChartData}
                                options={chartOptions} />

                        </div>
                    </div>}
                </div>
            }


        </section>
    )
}

export default Mapc