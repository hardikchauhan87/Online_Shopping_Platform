import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogout = () => {
    localStorage.removeItem("AdminEmail");
    localStorage.removeItem("adminAuthToken");
    console.log("Logout clicked, redirecting to login");
    window.location.href = "/login"; // Redirect to login after logout
  };

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      <div className="mt-4">
        <h4>Options</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/uploaddata" className="btn btn-link">Upload Items</Link>
          </li>
          <li className="list-group-item">
            <Link to="/uploadcat" className="btn btn-link">Upload Category</Link>
          </li>
          <li className="list-group-item">
            <Link to="/userView" className="btn btn-link">View User Data</Link>
          </li>
          <li className="list-group-item">
            <Link to="/addSupportUser" className="btn btn-link">Create Customer Support User</Link>
          </li>
          {/* Add more links here for additional admin functionality */}
        </ul>
      </div>
      <div className="mt-4">
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Dashboard;
