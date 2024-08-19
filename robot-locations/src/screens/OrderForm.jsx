import React, { useState, useCallback } from "react";
import axios from "axios";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "85vh",
};

const center = {
  lat: 6.9271, // Default center (Colombo, Sri Lanka)
  lng: 79.8612,
};

const OrderForm = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBsu2fZPJO0W5zLsAlkZmYVvpot1_AhU48",
    libraries: ["places"],
  });

  const [pickupLocation, setPickupLocation] = useState(null);
  const [deliveryLocation, setDeliveryLocation] = useState(null);
  const [pickupCoords, setPickupCoords] = useState(null);
  const [deliveryCoords, setDeliveryCoords] = useState(null);
  const [price, setPrice] = useState(null);

  const fetchPlaceDetails = async (placeId) => {
    const services = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );

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

  const handleLocationChange = async (location, setLocation, setCoords) => {
    setLocation(location);
    if (location?.value?.place_id) {
      try {
        const placeDetails = await fetchPlaceDetails(location.value.place_id);
        if (placeDetails?.geometry?.location) {
          setCoords({
            lat: placeDetails.geometry.location.lat(),
            lng: placeDetails.geometry.location.lng(),
          });
        }
      } catch (error) {
        console.error("Error fetching place details:", error);
      }
    }
  };

  const calculatePrice = (newLocation) => {
    if (pickupCoords && deliveryCoords) {
      const distance = calculateDistance(pickupCoords, deliveryCoords);
      // Example price calculation: $1 per km
      setPrice((distance * 100).toFixed(2));
    } else {
      alert("fill the pickup and delivery");
    }
  };

  const calculateDistance = (coords1, coords2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (coords2.lat - coords1.lat) * (Math.PI / 180);
    const dLng = (coords2.lng - coords1.lng) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(coords1.lat * (Math.PI / 180)) *
        Math.cos(coords2.lat * (Math.PI / 180)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      if (pickupCoords && deliveryCoords) {
        await axios.post(
          "http://localhost:8000/api/order/save-order",
          {
            pickupLatitude: pickupCoords.lat,
            pickupLongitude: pickupCoords.lng,
            deliveryLatitude: deliveryCoords.lat,
            deliveryLongitude: deliveryCoords.lng,
            // Include other form data as needed
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        alert("Order placed successfully!");
      } else {
        alert("Please select valid pickup and delivery locations.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order. Please try again.");
    }
  };

  const renderMap = useCallback(() => {
    if (!isLoaded) return "Loading Maps...";

    return (
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={pickupCoords || deliveryCoords || center}
      >
        {pickupCoords && <Marker position={pickupCoords} label="" />}
        {deliveryCoords && (
          <Marker position={deliveryCoords} label="" />
        )}
      </GoogleMap>
    );
  }, [isLoaded, pickupCoords, deliveryCoords]);

  return (
    <section className="booking">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="place-robot-form">
              <div className="form-group">
                <h2 className="heading">
                  <strong>Book Your Delivery</strong>
                </h2>

                <p>Pickup Location:</p>
                <GooglePlacesAutocomplete
                  selectProps={{
                    value: pickupLocation,
                    onChange: (location) =>
                      handleLocationChange(
                        location,
                        setPickupLocation,
                        setPickupCoords
                      ),
                  }}
                />
              </div>
              <div className="form-group">
                <p>Delivery Location:</p>
                <GooglePlacesAutocomplete
                  selectProps={{
                    value: deliveryLocation,
                    onChange: (location) =>
                      handleLocationChange(
                        location,
                        setDeliveryLocation,
                        setDeliveryCoords
                      ),
                  }}
                />
              </div>
              <button className="button" onClick={calculatePrice}>
                Search Robot
              </button>
            </div>

            {/* price of the robot */}
            {price !== null && (
              <div className="mt-5">
                <h4 className="fw-bold">Recommended</h4>
                <div className="card p-3 mb-3 border-dark">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="d-flex align-items-center">
                        <img
                          src="https://atlas-content-cdn.pixelsquid.com/stock-images/delivery-robot-robotics-B5mRVn3-600.jpg"
                          alt="Tuk"
                          className="me-2"
                          style={{ width: "100px" }}
                        />
                        <div>
                          <h5 className="mb-0">
                            Robot
                            <span className="badge bg-light text-dark">3</span>
                          </h5>
                          <small>2 mins away • 12:00</small>
                          <div>
                            <span className="badge bg-black text-white">
                              Faster
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-black">LKR {price}</h4>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center home-order-checkout">
                  <div className="d-flex justify-content-between align-items-center">
                    <img
                      src="https://icons.iconarchive.com/icons/designbolts/credit-card-payment/256/Visa-icon.png"
                      alt="Cash"
                      style={{ width: "30px" }}
                    />
                    <span className="ms-2 ml-2">Card • Personal</span>
                  </div>
                  <button className="button">Request Robot</button>
                </div>
              </div>
            )}
          </div>
          <div className="col-md-8">
            <div className="map">{renderMap()}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;

