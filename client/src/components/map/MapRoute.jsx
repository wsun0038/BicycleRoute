import React, { useState, useEffect, useRef } from 'react'
import css from './Mapc.module.scss'
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet'
import LoadRouteTask from '../../tasks/LoadRouteTask'

const MapRoute = () => {
    const [routes, setRoutes] = useState([]);
    const [activeRouteId, setActiveRouteId] = useState(null);
    const mapRef = useRef(null);

    const load = () => {
        const loadRouteTask = new LoadRouteTask();
        loadRouteTask.load(setRoutes);
    };

    useEffect(load, []);

    useEffect(() => {
        const map = mapRef.current;
        if (map) {
            map.eachLayer((layer) => {
                if (layer.feature && layer.feature.properties.geo_point_2d) {
                    const { type, direction, geo_point_2d } = layer.feature.properties;

                    // Detach old handlers
                    layer.off('mouseover').off('mouseout').off('click');

                    // Reattach event handlers
                    layer.on('click', () => {
                        setActiveRouteId(geo_point_2d);
                        layer.bindPopup(`Type: ${type} <br/> Direction: ${direction}`).openPopup(); // Rebind and open popup
                    });

                    layer.on('mouseover', () => {
                        if (activeRouteId !== geo_point_2d) {
                            layer.setStyle({
                                weight: 10,
                                color: 'green'
                            });
                        }
                    });

                    layer.on('mouseout', () => {
                        layer.setStyle(routeStyle(layer.feature));  // Reapply the correct style
                    });
                }
            });
        }
    }, [activeRouteId, routes]);  // Reattach handlers when activeRouteId changes

    // console.log(routes);

    const onEachRoute = (route, layer) => {
        const type = route.properties.type
        const direction = route.properties.direction
        const id = route.properties.geo_point_2d
        layer.bindPopup(`Type: ${type} <br/> Direction: ${direction}`)
        layer.on('click', () => {
            setActiveRouteId(id);
        })
        layer.on('mouseover', () => {
            if (activeRouteId !== id) {  // Only highlight if it's not the active route
                layer.setStyle({
                    weight: 10,
                    color: 'green'
                });
            }
        });
        layer.on('mouseout', () => {
            layer.setStyle(routeStyle(route));  // Reset to non-active style
        });
    }

    const routeStyle = (route) => {
        return {
            color: route.properties.geo_point_2d === activeRouteId ? 'red' : 'blue',
            weight: route.properties.geo_point_2d === activeRouteId ? 8 : 5,
            opacity: route.properties.geo_point_2d === activeRouteId ? 1 : 0.5,
            lineCap: 'round',
            lineJoin: 'round',
            dashArray: route.properties.type === 'bus' ? '5, 10' : null
        };
    };

    return (
        <section className={css.wrapper}>
            {
                routes.length === 0 ? <div>Loading...</div> : <div className={css.container}>
                    <span className="primaryText">
                        City of Melbourne Bicycle Route
                    </span>

                    <MapContainer ref={mapRef} center={[-37.815, 144.953]} zoom={14} minZoom={13} style={{ height: '80vh' }}>
                        <GeoJSON data={routes}
                            onEachFeature={onEachRoute}
                            style={routeStyle}
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