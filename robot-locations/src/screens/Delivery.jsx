import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Delivery = () => {
  const [targets, setTargets] = useState({
    pickup: { lat: 6.9271, lon: 79.8612 }, // Default home location in Colombo
    delivery: { lat: 6.9271, lon: 79.8612 }
  });
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState('');

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

  const handleSearch = async (locationKey) => {
    try {
      const response = await axios.get(`http://localhost:3000/searchLocation?query=${query}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching location:', error);
    }
  };

  const handleSelectLocation = (location, locationKey) => {
    setTargets(prevTargets => ({
      ...prevTargets,
      [locationKey]: { lat: location.geometry.location.lat, lon: location.geometry.location.lng }
    }));
    setSearchResults([]);
  };

  return (
    <div>
      <h1>Robot Location Manager</h1>
      
      <div>
        <h2>Pickup Location</h2>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Pickup Location"
        />
        <button onClick={() => handleSearch('pickup')}>Search</button>
        <ul>
          {searchResults.map((location, index) => (
            <li key={index} onClick={() => handleSelectLocation(location, 'pickup')}>
              {location.formatted_address}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Delivery Location</h2>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Delivery Location"
        />
        <button onClick={() => handleSearch('delivery')}>Search</button>
        <ul>
          {searchResults.map((location, index) => (
            <li key={index} onClick={() => handleSelectLocation(location, 'delivery')}>
              {location.formatted_address}
            </li>
          ))}
        </ul>
      </div>

      <button onClick={updateTargets}>Update Targets</button>
    </div>
  );
};

export default Delivery;
