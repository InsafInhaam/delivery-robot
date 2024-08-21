import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {
  GoogleMap,
  Marker,
  DirectionsService,
  DirectionsRenderer,
  useLoadScript,
} from "@react-google-maps/api";
import robotIcon from "../assets/robot.png";

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
    googleMapsApiKey: "AIzaSyBsu2fZPJO0W5zLsAlkZmYVvpot1_AhU48", // Replace with your actual API key
    libraries: ["places"],
  });

  const [pickupLocation, setPickupLocation] = useState(null);
  const [deliveryLocation, setDeliveryLocation] = useState(null);
  const [pickupCoords, setPickupCoords] = useState(null);
  const [deliveryCoords, setDeliveryCoords] = useState(null);
  const [price, setPrice] = useState(null);
  const [directions, setDirections] = useState(null);

  const [robots, setRobots] = useState([]);

  useEffect(() => {
    // Fetch initial robots data
    const fetchRobots = async () => {
      const response = await fetch("http://localhost:8000/api/robot/robots");
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
  }, []);

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

  const calculatePrice = () => {
    if (pickupCoords && deliveryCoords) {
      const distance = calculateDistance(pickupCoords, deliveryCoords);
      // Example price calculation: $1 per km
      setPrice((distance * 100).toFixed(2));

      // Request directions
      setDirections({
        origin: pickupCoords,
        destination: deliveryCoords,
        travelMode: window.google.maps.TravelMode.DRIVING,
      });
    } else {
      alert("Please fill in the pickup and delivery locations.");
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
        {pickupCoords && <Marker position={pickupCoords} label="P" />}
        {deliveryCoords && <Marker position={deliveryCoords} label="D" />}

        {robots.map((robot) => (
          <Marker
            key={robot.serialNumber} // Assuming each robot has a unique serial number
            position={{
              lat: robot.lastKnownCoordinates.latitude,
              lng: robot.lastKnownCoordinates.longitude,
            }}
            icon={{
              url: robotIcon, // Your custom robot icon
              scaledSize: new window.google.maps.Size(35, 35), // Adjust size as needed
            }}
          />
        ))}

        {pickupCoords && deliveryCoords && directions && (
          <DirectionsService
            options={{
              origin: pickupCoords,
              destination: deliveryCoords,
              travelMode: window.google.maps.TravelMode.DRIVING,
            }}
            callback={(result, status) => {
              if (status === window.google.maps.DirectionsStatus.OK) {
                setDirections(result);
              } else {
                console.error(`error fetching directions ${result}`);
              }
            }}
          />
        )}
        {directions && (
          <DirectionsRenderer
            options={{
              directions: directions,
              polylineOptions: {
                strokeColor: "black", // Change the color of the route line to black
                strokeOpacity: 1.0,
                strokeWeight: 5, // Adjust the thickness of the line
              },
            }}
          />
        )}
      </GoogleMap>
    );
  }, [isLoaded, pickupCoords, deliveryCoords, directions, robots]);

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
                  searchOptions={{
                    componentRestrictions: { country: "LK" },
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
                  searchOptions={{
                    componentRestrictions: { country: "LK" },
                  }}
                />
              </div>
              <button className="button" onClick={calculatePrice}>
                Search Robot
              </button>
            </div>

            {/* Price of the robot */}
            {price !== null && (
              <div className="mt-5">
                <h4 className="fw-bold">Recommended</h4>
                <div className="card p-3 mb-3 border-dark">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="d-flex align-items-center">
                        <img
                          src="https://atlas-content-cdn.pixelsquid.com/stock-images/delivery-robot-robotics-B5mRVn3-600.jpg"
                          alt="Robot"
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

                <div className="terms-conditions">
                  <h5>Review package guidelines</h5>
                  <p>
                    For a successful delivery, make sure your package is:
                    <br />
                    <ul>
                      <li>5 kg or less</li>
                      <li>LKR 10000 or less in value</li>
                      <li>Securely sealed and ready for pickup Prohibited items</li>
                    </ul>
                    Alcohol, medication, drugs, firearms, and dangerous or
                    illegal items are prohibited. Items sent via AutoDrop must
                    comply with all laws and regulations and with AutoDrop
                    policies. Violations may be reported to authorities and app
                    access may be removed. AutoDrop will cooperate with law
                    enforcement on any illegal activity.
                  </p>
                  <a href="#" className="button-bg">
                    See all prohibited items
                  </a>
                  <br /><br />
                  <p>
                    AutoDrop does not maintain insurance for packages. By
                    tapping confirm order, you are consenting to the Terms and
                    Conditions.
                  </p>
                  <a href="#" className="see-terms">See terms</a>
                  <br /><br />
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
                  <button className="button" onClick={handleSubmit}>Request Robot</button>
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
