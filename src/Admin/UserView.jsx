import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserView = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data.users);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleViewOrders = (email) => {
    navigate(`/vieworder/${email}`); // Navigate to the order page with the email as a route parameter
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2>User Data</h2>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Action</th> {/* Added Action column */}
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={index}>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => handleViewOrders(user.email)}
                  >
                    View Orders
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserView;
