import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Importing icons

const RobotList = () => {
  const [robots, setRobots] = useState([]);

  useEffect(() => {
    const fetchRobots = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/robot/robots"
        );
        setRobots(response.data);
      } catch (error) {
        console.error("Error fetching robots:", error);
      }
    };

    fetchRobots();
  }, []);

  const handleUpdate = (id) => {
    // Handle update logic here
    console.log("Update robot with ID:", id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/robot/delete-robots/${id}`);
      setRobots(robots.filter((robot) => robot._id !== id));
    } catch (error) {
      console.error("Error deleting robot:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Robots</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Robot Id</th>
            <th>Serial Number</th>
            <th>Name</th>
            <th>Model Number</th>
            <th>Status</th>
            <th>Firmware Version</th>
            <th>Last Known Coordinates</th>
            <th>Lid Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {robots.map((robot) => (
            <tr key={robot._id}>
              <td>{robot._id}</td>

              <td>{robot.serialNumber}</td>
              <td>{robot.name}</td>
              <td>{robot.modelNumber}</td>
              <td>{robot.status}</td>
              <td>{robot.firmwareVersion}</td>
              <td>
                {robot.lastKnownCoordinates
                  ? `${robot.lastKnownCoordinates.latitude}, ${robot.lastKnownCoordinates.longitude}`
                  : "N/A"}
              </td>
              <td>{robot.lidStatus}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleUpdate(robot._id)}
                >
                  <FaEdit color="white" />
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(robot._id)}
                >
                  <FaTrashAlt color="white" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RobotList;
