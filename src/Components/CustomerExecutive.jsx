import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

// Connect to backend
const socket = io("http://localhost:5010");

const CustomerCareExecutive = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(""); // Track which user is selected
  const [users, setUsers] = useState([]); // Track list of users currently in the chat room

  useEffect(() => {
    // Listen for incoming messages
    socket.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);

      // Keep track of unique users who are part of the chat
      if (!users.includes(msg.userName)) {
        setUsers((prevUsers) => [...prevUsers, msg.userName]);
      }
    });

    // Cleanup when the component unmounts
    return () => {
      socket.off("message");
    };
  }, [messages, users]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && selectedUser) {
      // Send the reply message to the selected user
      socket.emit("sendmessage", { userName: "CustomerCare", message, toUser: selectedUser });
      setMessage(""); // Clear the input after sending
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Customer Care Executive</h2>
      
      {/* Active Users List */}
      <div className="row my-4">
        <div className="col-md-4">
          <h3>Active Users</h3>
          <ul className="list-group">
            {users.map((user, index) => (
              <li
                key={index}
                className={`list-group-item ${selectedUser === user ? 'active' : ''}`}
                onClick={() => setSelectedUser(user)}
                style={{ cursor: 'pointer' }}
              >
                {user}
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Messages */}
        <div className="col-md-8">
          <h3>Messages</h3>
          <div className="chat-box border p-3 rounded" style={{ height: '400px', overflowY: 'scroll' }}>
            {messages
              .filter((msg) => msg.userName === selectedUser || msg.userName === "CustomerCare")
              .map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 mb-2 ${msg.userName === selectedUser ? 'bg-light' : 'bg-success text-white'}`}
                  style={{ borderRadius: '5px' }}
                >
                  <strong>{msg.userName}:</strong> {msg.message}
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Message Input Form */}
      <form onSubmit={sendMessage} className="d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Type your reply..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button className="btn btn-primary" type="submit" disabled={!selectedUser || !message.trim()}>
          Send Reply
        </button>
      </form>
    </div>
  );
};

export default CustomerCareExecutive;
