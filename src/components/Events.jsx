import { useLoaderData } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default Leaflet icon issue in React
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const Events = () => {
    // 1. Access the data from the loader
    const centers = useLoaderData();

    return (
        <div className="container mx-auto p-6">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-red-600 mb-2">Blood Donation Events</h1>
                <p className="text-gray-600">Explore {centers.length} active requests across Bangladesh</p>
            </div>

            {/* 2. Render the Map */}
            <div className="h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <MapContainer center={[23.6850, 90.3563]} zoom={7} className="h-full w-full">
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a>'
                    />
                    
                    {centers.map(center => (
                        <Marker key={center.id} position={[center.lat, center.lng]}>
                            <Popup>
                                <div className="p-2 min-w-[200px]">
                                    <span className={`badge ${center.status === 'Urgent' ? 'badge-error' : 'badge-info'} text-white text-[10px] mb-1`}>
                                        {center.event}
                                    </span>
                                    <h3 className="font-bold text-lg text-red-700">{center.hospitalName}</h3>
                                    <p className="text-sm"><b>Patient:</b> {center.patientName}</p>
                                    <p className="text-sm"><b>Blood Needed:</b> <span className="text-red-600 font-bold">{center.bloodGroup}</span></p>
                                    <p className="text-sm italic text-gray-500 mt-2">"{center.details}"</p>
                                    <div className="divider my-1"></div>
                                    <a href={`tel:${center.contact}`} className="btn btn-xs btn-outline btn-error w-full mt-1">
                                        Contact: {center.contact}
                                    </a>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default Events;
