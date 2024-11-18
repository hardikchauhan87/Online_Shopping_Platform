import React, { useState } from 'react';

const AddSupportUser = () => {
  const [supportInfo, setSupportInfo] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/createSupportUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: supportInfo.email,
        password: supportInfo.password,
      }),
    });

    const data = await response.json();
    if (data.success) {
      alert('Customer support user created successfully!');
      // Redirect back to the admin dashboard or any other page
    } else {
      alert('Failed to create customer support user');
    }
  };

  const onChange = (e) => {
    setSupportInfo({ ...supportInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5">
      <h2>Create Customer Support User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input
            type="email"
            name="email"
            value={supportInfo.email}
            onChange={onChange}
            className="form-control"
            id="email"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            name="password"
            value={supportInfo.password}
            onChange={onChange}
            className="form-control"
            id="password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Support User</button>
      </form>
    </div>
  );
};

export default AddSupportUser;
