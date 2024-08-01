import React from 'react'
import css from './Mapc.module.scss'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const Mapc = () => {
    return (
        <section className={css.wrapper}>
            <div className={css.container}>
                <MapContainer center={[48.8566, 2.3522]} zoom={12} style={{ height: '700px' }}>
                    <TileLayer
                        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[48.8566, 2.3522]}>
                        <Popup>
                            <span>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </span>
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </section>
    )
}

export default Mapc