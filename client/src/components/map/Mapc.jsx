import React, { useState, useEffect } from 'react'
import css from './Mapc.module.scss'
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet'
import LoadSuburbTask from '../../tasks/LoadSuburbTask'




const Mapc = () => {
    const [suburbs, setSuburbs] = useState([]);
    const [selectedSuburb, setSelectedSuburb] = useState('');
    const [suburbData, setSuburbData] = useState(null);

    const load = () => {
        const loadSuburbTask = new LoadSuburbTask();
        loadSuburbTask.load(setSuburbs);
    };

    useEffect(load, []);

    //console.log(suburbs);

    const onEachSuburb = (suburb, layer) =>{
        //layer.options.fillColor = 
        const name = suburb.properties.vic_loca_2;
        layer.on('click', () => {
            setSelectedSuburb(name);
            fetchSuburbData(name);
        });
        layer.bindPopup(`${name}`)
    }

    const fetchSuburbData = async (name) => {
        try {
            const url = `/api/suburb/${name}`;
            console.log('Fetching data from URL:', url); // Log the URL
            const response = await fetch(url);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            const data = await response.json();
            setSuburbData(data);
        } catch (err) {
            console.error('Error fetching suburb data:', err);
        }
    };


    return (
        <section className={css.wrapper}>

            {
                suburbs.length === 0 ? <div>Loading...</div> : <div className={css.container}>
                    <MapContainer center={[-37.815, 144.953]} zoom={13} style={{ height: '80vh' }}>
                        <GeoJSON data={suburbs} 
                        onEachFeature = {onEachSuburb}
                        />
                        <TileLayer
                            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </MapContainer>
                    <div>
                        {selectedSuburb && <p>You clicked on: {selectedSuburb}</p>}
                        {suburbData && (
                            <div>
                                <h3>Suburb Data:</h3>
                                <pre>{JSON.stringify(suburbData, null, 2)}</pre>
                            </div>
                        )}
                    </div>
                </div>
            }


        </section>
    )
}

export default Mapc