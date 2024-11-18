import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [info, setInfo] = useState({
    email: '',
    password: '',
  });

  const [adminInfo, setAdminInfo] = useState({
    adminEmail: '',
    adminPassword: '',
  });

  const [isAdmin, setIsAdmin] = useState(false); // State to toggle between User and Admin login
  const [isSupport, setIsSupport] = useState(false); // State to toggle between Support login

  let navigate = useNavigate();

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/loginuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: info.email,
        password: info.password,
      }),
    });

    const data = await response.json();
    if (!data.success) {
      alert('Enter valid data');
    } else {
      localStorage.setItem("UserEmail", info.email);
      localStorage.setItem("authToken", data.authToken);
      navigate("/"); // Redirect to user home page
    }
  };

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    // Static admin credentials
    const staticAdminEmail = "Khushu87@gmail.com";
    const staticAdminPassword = "hardik";

    if (adminInfo.adminEmail === staticAdminEmail && adminInfo.adminPassword === staticAdminPassword) {
      localStorage.setItem("AdminEmail", adminInfo.adminEmail);
      localStorage.setItem("adminAuthToken", "static-admin-auth-token");
      navigate("/dashboard"); // Redirect to admin dashboard
    } else {
      alert('Invalid admin credentials');
    }
  };

  const handleSupportSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/loginSupportUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: info.email,
        password: info.password,
      }),
    });
console.log(response)
    const data = await response.json();
    if (!data.success) {
      alert(data.message);  // Display the error message
    } else {
      localStorage.setItem('SupportEmail', info.email);
      localStorage.setItem('supportAuthToken', data.authToken);
      navigate("/care"); // Redirect to customer care executive page
    }
  };

  const onChangeUser = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const onChangeAdmin = (e) => {
    setAdminInfo({ ...adminInfo, [e.target.name]: e.target.value });
  };

  const toggleLoginMode = () => {
    if (isAdmin) {
      setIsAdmin(false);
      setIsSupport(false);
    } else {
      setIsAdmin(!isAdmin);
      setIsSupport(false);
    }
  };

  const toggleSupportLoginMode = () => {
    setIsSupport(!isSupport);
    setIsAdmin(false); // Disable Admin login when switching to Support
  };

  return (
    <div className="container">
      <h2>{isAdmin ? "Admin Login" : isSupport ? "Support Login" : "User Login"}</h2>

      <form onSubmit={isAdmin ? handleAdminSubmit : isSupport ? handleSupportSubmit : handleUserSubmit}>
        <div className="mb-3">
          <label htmlFor={isAdmin ? "adminEmail" : isSupport ? "supportEmail" : "exampleInputEmail1"} className="form-label">
            {isAdmin ? "Admin Email" : isSupport ? "Support Email" : "Email address"}
          </label>
          <input
            type="email"
            name={isAdmin ? "adminEmail" : isSupport ? "supportEmail" : "email"}
            value={isAdmin ? adminInfo.adminEmail : isSupport ? info.email : info.email}
            onChange={isAdmin ? onChangeAdmin : isSupport ? onChangeUser : onChangeUser}
            className="form-control"
            id={isAdmin ? "adminEmail" : isSupport ? "supportEmail" : "exampleInputEmail1"}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor={isAdmin ? "adminPassword" : isSupport ? "supportPassword" : "exampleInputPassword1"} className="form-label">
            {isAdmin ? "Admin Password" : isSupport ? "Support Password" : "Password"}
          </label>
          <input
            type="password"
            name={isAdmin ? "adminPassword" : isSupport ? "supportPassword" : "password"}
            onChange={isAdmin ? onChangeAdmin : isSupport ? onChangeUser : onChangeUser}
            value={isAdmin ? adminInfo.adminPassword : isSupport ? info.password : info.password}
            className="form-control"
            id={isAdmin ? "adminPassword" : isSupport ? "supportPassword" : "exampleInputPassword1"}
            required
          />
        </div>

        <button type="submit" className="btn m-1 btn-primary">
          {isAdmin ? "Admin Login" : isSupport ? "Support Login" : "User Login"}
        </button>

        {/* Switch between user, admin, and support login */}
        <div className="mt-2">
          <button
            type="button"
            className="btn btn-link"
            onClick={toggleLoginMode}
          >
            {isAdmin ? "Switch to User Login" : isSupport ? "Switch to User Login" : "Switch to Admin Login"}
          </button>
        </div>

        {/* User-specific link */}
        {!isAdmin && !isSupport && (
          <Link to="/createuser" className="m-3 btn btn-danger">
            I am a new user
          </Link>
        )}

        {/* Switch to Support Login */}
        {!isAdmin && (
          <button
            type="button"
            className="btn btn-link"
            onClick={toggleSupportLoginMode}
          >
            Switch to Support Login
          </button>
        )}
      </form>
    </div>
  );
};

export default Login;
