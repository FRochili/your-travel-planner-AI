'use client'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

export default function Map({locations}) {
    return (
        <MapContainer 
            center={[locations[0].lat, locations[0].lng]}
            zoom={13}
            style={{ height:'400px', width:'100%'}}
        >
            <TileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locations.map((loc, index) => (
                <Marker key={index} position={[loc.lat, loc.lng]}>
                    <Popup>{loc.location}</Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}