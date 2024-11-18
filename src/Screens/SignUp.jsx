import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [info, setInfo] = useState({
    name: '',
    email: '',
    password: '',
    geolocation: '', // Correct casing here
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/CreateUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: info.name,
        email: info.email,
        password: info.password,
        location: info.geolocation, // Correct casing here
      }),
    });

    const data = await response.json();
    console.log(data);
    if (!data.success) {
      alert('Enter valid data');
    }
   
  };

  const onChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              name="name"
              value={info.name}
              onChange={onChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input
              type="email"
              name="email"
              value={info.email}
              onChange={onChange}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input
              type="password"
              name="password"
              onChange={onChange}
              value={info.password}
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="geolocation" className="form-label">Address</label>
            <input
              type="text" // Changed from password to text
              name="geolocation" // Correct casing here
              onChange={onChange}
              value={info.geolocation}
              className="form-control"
              id="geolocation"
            />
          </div>

          <button type="submit" className="btn m-1 btn-primary">Submit</button>
          <Link to="/login" className="m-3 btn btn-danger">
            Already a User
          </Link>
        </form>
      </div>
    </>
  );
};

export default SignUp;
