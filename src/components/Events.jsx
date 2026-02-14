import { useLoaderData } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useState, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MdSearch, MdLocationOn } from "react-icons/md";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const FlyToLocation = ({ target }) => {
  const map = useMap();
  useEffect(() => {
    if (target) {
      map.flyTo([target.lat, target.lng], 14, { duration: 2 });
    }
  }, [target, map]);
  return null;
};

const Events = () => {
  const centers = useLoaderData();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCenters, setFilteredCenters] = useState(centers);
  const [flyTarget, setFlyTarget] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const results = centers.filter(
      (center) =>
        center.hospitalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        center.bloodGroup.toLowerCase().includes(searchQuery.toLowerCase()) ||
        center.address.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredCenters(results);
  }, [searchQuery, centers]);

  const handleSelect = (center) => {
    setFlyTarget(center);
    setIsOpen(false);
    setSearchQuery(center.hospitalName); 
  };

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-red-600 mb-2">
          Live Donation Requests
        </h1>
        <p className="text-gray-600">
          Showing {centers.length} urgent needs across the country
        </p>
      </div>

      {/* --- Search Bar Container --- */}
      <div ref={dropdownRef} className="max-w-xl mx-auto mb-8 relative">
        <div className="relative group">
          <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-400 group-focus-within:text-red-500 transition-colors" />
          <input
            type="text"
            placeholder="Search by hospital, blood group, or city..."
            className="input input-bordered w-full pl-12 rounded-full border-2 focus:border-red-500 outline-none"
            value={searchQuery}
            onFocus={() => setIsOpen(true)} // Show dropdown on focus
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsOpen(true);
            }}
          />
        </div>

        {/* --- Search Result Dropdown --- */}
        {isOpen && searchQuery && (
          <div className="absolute z-[2000] w-full bg-white mt-2 rounded-xl shadow-2xl border border-gray-100 max-h-72 overflow-y-auto">
            {filteredCenters.length > 0 ? (
              filteredCenters.map((center) => (
                <button
                  key={center.id}
                  onClick={() => handleSelect(center)}
                  className="flex items-center gap-3 w-full p-4 hover:bg-red-50 border-b last:border-0 transition-colors"
                >
                  <div className="p-2 bg-red-100 rounded-full">
                    <MdLocationOn className="text-red-500 text-xl" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-sm text-gray-800">
                      {center.hospitalName}
                    </p>
                    <p className="text-xs text-gray-500">
                      <span className="text-red-600 font-bold">
                        {center.bloodGroup}
                      </span>{" "}
                      • {center.address}
                    </p>
                  </div>
                </button>
              ))
            ) : (
              <p className="p-4 text-center text-gray-400">
                No matching requests.
              </p>
            )}
          </div>
        )}
      </div>

      {/* --- Map Container --- */}
      <div className="h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white relative z-0">
        <MapContainer
          center={[23.685, 90.3563]}
          zoom={7}
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap"
          />

          <FlyToLocation target={flyTarget} />

          {filteredCenters.map((center) => (
            <Marker key={center.id} position={[center.lat, center.lng]}>
              <Popup>
                <div className="p-2 min-w-[200px]">
                  <span
                    className={`badge ${center.status === "Urgent" ? "badge-error" : "badge-info"} text-white text-[10px] mb-1 px-2`}
                  >
                    {center.status}
                  </span>
                  <h3 className="font-bold text-md text-red-700 leading-tight">
                    {center.hospitalName}
                  </h3>
                  <div className="text-xs mt-2 space-y-1">
                    <p>
                      <b>Patient:</b> {center.patientName}
                    </p>
                    <p>
                      <b>Need:</b>{" "}
                      <span className="text-red-600 font-bold">
                        {center.bloodGroup} ({center.units} units)
                      </span>
                    </p>
                    <p>
                      <b>Address:</b> {center.address}
                    </p>
                  </div>
                  <div className="divider my-2"></div>
                  <a
                    href={`tel:${center.contact}`}
                    className="btn btn-xs btn-error text-white w-full"
                  >
                    Call: {center.contact}
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
