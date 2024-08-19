import React, { useState } from "react";
import axios from "axios";

const RobotCreate = () => {
  const [robot, setRobot] = useState({
    name: "",
    status: "",
    latitude: "",
    longitude: "",
    modelNumber: "",
    firmwareVersion: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRobot({ ...robot, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, status, latitude, longitude, modelNumber, firmwareVersion } =
      robot;
    const lastKnownCoordinates =
      latitude && longitude
        ? { latitude: parseFloat(latitude), longitude: parseFloat(longitude) }
        : undefined;

    try {
      const response = await axios.post(
        "http://localhost:8000/api/robot/create-robot",
        {
          name,
          status,
          lastKnownCoordinates,
          modelNumber,
          firmwareVersion,
        }
      );

      if (response.status === 201) {
        setMessage("Robot Created Successfully");
        setRobot({
          name: "",
          status: "",
          latitude: "",
          longitude: "",
          modelNumber: "",
          firmwareVersion: "",
        });
      }
    } catch (error) {
      setMessage("Error creating robot: " + error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add New Robot</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={robot.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            className="form-control"
            id="status"
            name="status"
            value={robot.status}
            onChange={handleChange}
            required
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="maintenance">Maintenance</option>
            <option value="offline">Offline</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="latitude">Latitude</label>
          <input
            type="number"
            className="form-control"
            id="latitude"
            name="latitude"
            value={robot.latitude}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="longitude">Longitude</label>
          <input
            type="number"
            className="form-control"
            id="longitude"
            name="longitude"
            value={robot.longitude}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="modelNumber">Model Number</label>
          <input
            type="text"
            className="form-control"
            id="modelNumber"
            name="modelNumber"
            value={robot.modelNumber}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="firmwareVersion">Firmware Version</label>
          <input
            type="text"
            className="form-control"
            id="firmwareVersion"
            name="firmwareVersion"
            value={robot.firmwareVersion}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Add Robot
        </button>
      </form>
    </div>
  );
};

export default RobotCreate;
