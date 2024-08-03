import React, { useState, useEffect } from 'react'
import css from './Mapc.module.scss'
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet'
import LoadSuburbTask from '../../tasks/LoadSuburbTask'




const Mapc = () => {
    const [suburbs, setSuburbs] = useState([]);
    const [selectedSuburb, setSelectedSuburb] = useState('');
    const [suburbData, setSuburbData] = useState(null);
    const [mergedData, setMergedData] = useState([]);

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
        const count = feature.properties.count || 0; // Default to 0 if no count
        return {
            fillColor: getColor(count),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    };

    const onEachSuburb = (suburb, layer) =>{
        //layer.options.fillColor = 
        const name = suburb.properties.vic_loca_2;
        layer.on('click', () => {
            setSelectedSuburb(name);
        });
        layer.bindPopup(`${name}`)
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

    return (
        <section className={css.wrapper}>

            {
                mergedData.length === 0 ? <div>Loading...</div> : <div className={css.container}>
                    <MapContainer center={[-37.815, 144.953]} zoom={13} style={{ height: '80vh' }}>
                        <GeoJSON data={mergedData} 
                        style = {style}
                        onEachFeature = {onEachSuburb}
                        />
                        <TileLayer
                            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </MapContainer>
                    <div>
                        {selectedSuburb && <p>You clicked on: {selectedSuburb}</p>}
                        {suburbData && suburbData.length > 0 && (
                            <div>
                                <h3>Suburb Data:</h3>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Suburb</th>
                                            <th>LGA Name</th>
                                            <th>Postcode Crash</th>
                                            <th>Count</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {suburbData.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.suburb}</td>
                                                <td>{item.lga_name}</td>
                                                <td>{item.postcode_crash}</td>
                                                <td>{item.count}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            }


        </section>
    )
}

export default Mapc