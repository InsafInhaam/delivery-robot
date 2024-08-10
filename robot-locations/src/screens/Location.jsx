import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import axios from 'axios';

const Location = () => {
  const [pickupLocation, setPickupLocation] = useState(null);
  const [deliveryLocation, setDeliveryLocation] = useState(null);

  const fetchPlaceDetails = async (placeId) => {
    const services = new window.google.maps.places.PlacesService(document.createElement('div'));
    
    return new Promise((resolve, reject) => {
      services.getDetails({ placeId }, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          resolve(place);
        } else {
          reject(new Error(`PlacesServiceStatus error: ${status}`));
        }
      });
    });
  };

  const saveLocations = async () => {
    if (pickupLocation && deliveryLocation) {
      try {
        const pickupDetails = await fetchPlaceDetails(pickupLocation.value.place_id);
        const deliveryDetails = await fetchPlaceDetails(deliveryLocation.value.place_id);
        
        if (pickupDetails.geometry && deliveryDetails.geometry) {
          console.log("Pickup Latitude:", pickupDetails.geometry.location.lat());
          console.log("Pickup Longitude:", pickupDetails.geometry.location.lng());
          console.log("Delivery Latitude:", deliveryDetails.geometry.location.lat());
          console.log("Delivery Longitude:", deliveryDetails.geometry.location.lng());

          const payload = {
            pickupLatitude: pickupDetails.geometry.location.lat(),
            pickupLogitude:  pickupDetails.geometry.location.lng(),
            deliveryLatitude: deliveryDetails.geometry.location.lat(),
            deliveryLongitude: deliveryDetails.geometry.location.lng(),
          };
          
          // Here you can add code to send these details to your backend.
          await axios.post('http://localhost:8000/api/save-location', payload);
        } else {
          console.error("Geometry data not available for one or both locations.");
        }
      } catch (error) {
        console.error("Error fetching place details:", error);
      }
    } else {
      alert("Please select both pickup and delivery locations.");
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Robot Delivery Location Picker</h1>
      <div className="form-group">
        <h3>Pickup Location:</h3>
        <GooglePlacesAutocomplete
          selectProps={{
            onChange: setPickupLocation,
          }}
        />
      </div>
      <div className="form-group">
        <h3>Delivery Location:</h3>
        <GooglePlacesAutocomplete
          selectProps={{
            onChange: setDeliveryLocation,
          }}
        />
      </div>
      <button className="button" onClick={saveLocations}>Save Locations</button>
    </div>
  );
};

export default Location;
