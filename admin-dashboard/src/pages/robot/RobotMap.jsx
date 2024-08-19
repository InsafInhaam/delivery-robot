import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import robotIcon from '../../assets/robot.png'; // Your custom icon image

const RobotMap = () => {
  const [robots, setRobots] = useState([]);

  useEffect(() => {
    // Fetch initial robots data
    const fetchRobots = async () => {
      const response = await fetch('http://localhost:8000/api/robot/robots');
      const data = await response.json();
      console.log(data); // Check the structure of the response

      // Ensure coordinates are numbers
      const validatedData = data.map((robot) => ({
        ...robot,
        lastKnownCoordinates: {
          latitude: parseFloat(robot.lastKnownCoordinates.latitude),
          longitude: parseFloat(robot.lastKnownCoordinates.longitude),
        },
      }));

      setRobots(validatedData);
    };
    fetchRobots();

    // Listen for real-time updates
    // socket.on("robotUpdate", (updatedRobot) => {
    //   setRobots((prevRobots) =>
    //     prevRobots.map((robot) =>
    //       robot.name === updatedRobot.name ? updatedRobot : robot
    //     )
    //   );
    // });

    // return () => {
    //   socket.off("robotUpdate");
    // };
  }, []);

  const customMarkerIcon = L.icon({
    iconUrl: robotIcon,
    iconSize: [40, 40], // size of the icon
    iconAnchor: [20, 40], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -40], // point from which the popup should open relative to the iconAnchor
    shadowSize: [41, 41], // size of the shadow
  });

  return (
    <MapContainer
      center={[7.8731, 80.7718]} // Coordinates of Sri Lanka
      zoom={13}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      {robots.map((robot, index) => {
        const { latitude, longitude } = robot.lastKnownCoordinates;

        // Validate coordinates
        if (isNaN(latitude) || isNaN(longitude)) {
          console.error(`Invalid coordinates for robot ${robot.name}: (${latitude}, ${longitude})`);
          return null; // Skip rendering this marker
        }

        return (
          <Marker
            key={index}
            position={[latitude, longitude]}
            icon={customMarkerIcon}
          >
            <Popup>{robot.name}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default RobotMap;
