import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom icons
const pickupIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/854/854866.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const deliveryIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const homeIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684907.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const Map = () => {
  const [targets, setTargets] = useState({
    pickup: { lat: 6.9271, lon: 79.8612 }, // Coordinates for Colombo
    delivery: { lat: 6.9439569, lon: 79.8629588 },
    home: { lat: 6.9494699, lon: 79.8601027 }
  });

  useEffect(() => {
    axios.get('http://localhost:3000/targets')
      .then(response => setTargets(response.data))
      .catch(error => console.error(error));
  }, []);

  const updateTargets = () => {
    axios.post('http://localhost:3000/updateTargets', targets)
      .then(response => alert(response.data))
      .catch(error => console.error(error));
  };

  const LocationMarker = ({ locationKey, icon }) => {
    const map = useMapEvents({
      click(e) {
        setTargets(prevTargets => ({
          ...prevTargets,
          [locationKey]: { lat: e.latlng.lat, lon: e.latlng.lng }
        }));
      }
    });

    return targets[locationKey] ? (
      <Marker position={[targets[locationKey].lat, targets[locationKey].lon]} icon={icon}>
        <Popup>{locationKey}</Popup>
      </Marker>
    ) : null;
  };

  return (
    <div>
      <h1>Robot Location Manager</h1>
      <MapContainer center={[6.9271, 79.8612]} zoom={13} style={{ height: '600px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker locationKey="pickup" icon={pickupIcon} />
        <LocationMarker locationKey="delivery" icon={deliveryIcon} />
        <LocationMarker locationKey="home" icon={homeIcon} />
      </MapContainer>
      <button onClick={updateTargets}>Update Targets</button>
    </div>
  );
};

export default Map;
