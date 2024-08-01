import React, { useState, useEffect } from 'react'
import css from './Mapc.module.scss'
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet'
import LoadRouteTask from '../../tasks/LoadRouteTask'

const MapRoute = () => {
    const [routes, setRoutes] = useState([]);

    const load = () => {
        const loadRouteTask = new LoadRouteTask();
        loadRouteTask.load(setRoutes);
    };

    useEffect(load, []);

    // console.log(routes);

    const onEachRoute = (route, layer) =>{
        const type = route.properties.type
        const direction = route.properties.direction
        layer.bindPopup(`Type: ${type} <br/> Direction: ${direction}`)
    }

    return (
        <section className={css.wrapper}>



            {
                routes.length === 0 ? <div>Loading...</div> : <div className={css.container}>
                    <MapContainer center={[-37.815, 144.953]} zoom={13} style={{ height: '80vh' }}>
                        <GeoJSON data={routes}
                            onEachFeature={onEachRoute}
                        />
                        <TileLayer
                            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </MapContainer>
                </div>
            }


        </section>
    )
}

export default MapRoute