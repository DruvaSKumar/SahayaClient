import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const GeolocationPage = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          setError(`Error: ${err.message}`);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
    }
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your Location</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {location ? (
        <div>
          <p className="mb-4">
            Your current location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
          </p>
          <div className="h-96 w-full">
            <MapContainer center={[location.lat, location.lng]} zoom={13} style={{ height: "100%", width: "100%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[location.lat, location.lng]}>
                <Popup>You are here</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
};

export default GeolocationPage;