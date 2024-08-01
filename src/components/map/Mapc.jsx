import React, { useState, useEffect } from 'react'
import css from './Mapc.module.scss'
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet'
import LoadSuburbTask from '../../tasks/LoadSuburbTask'




const Mapc = () => {
    const [suburbs, setSuburbs] = useState([]);
    const [selectedSuburb, setSelectedSuburb] = useState('');

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
        });
        layer.bindPopup(`${name}`)
    }


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
                    </div>
                </div>
            }


        </section>
    )
}

export default Mapc