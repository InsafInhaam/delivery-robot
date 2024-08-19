import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const Home = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://localhost:8000/api/order/orders",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handlePlaceOrder = () => {
    navigate("/order-form");
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:8000/api/order/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(orders.filter((order) => order._id !== orderId)); // Update the state to remove the deleted order
    } catch (error) {
      console.error("Error deleting the order:", error);
    }
  };

  return (
    <div className="container">
      <h1>Welcome Robot Delivery App 🦾</h1>
      <button onClick={handlePlaceOrder} className="button">
        Place a Robot Delivery Order
      </button>
      <h2>Upcoming Orders 👇</h2>
      <div className="order-list">
        {orders.map((order) => (
          <div className="order-card" key={order._id}>
            <h3>{order.productName}</h3>
            <p>{order.productDescription}</p>
            <p>
              <b>Order Id:</b> {order._id}
            </p>
            <p>
              <b>Pickup Location:</b> {order.pickupLatitude},{" "}
              {order.pickupLongitude}
            </p>
            <p>
              <b>Delivery Location:</b> {order.deliveryLatitude},{" "}
              {order.deliveryLongitude}
            </p>
            <p>
              <b>Weight:</b> {order.weightKg} kg
            </p>
            <p>
              <b>Category:</b> {order.category}
            </p>
            <p>
              <b>Assigned Robot:</b> {order.assignedRobot}
            </p>
            <p>
              <b>Status:</b> {order.status}
            </p>

            <button
              onClick={() => handleDeleteOrder(order._id)}
              className="button delete-button"
            >
              Delete❕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
