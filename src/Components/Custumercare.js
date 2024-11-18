import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

// Make sure you're connecting to the correct port
const socket = io("http://localhost:5010");

const CustomerCare = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [isJoined, setIsJoined] = useState(false);

  // Handle joining chat room
  useEffect(() => {
    if (userName) {
      socket.emit("join", { userName });
      setIsJoined(true);
    }

    // Listen for incoming messages
    socket.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Cleanup when the component is unmounted
    return () => {
      socket.off("message");
      if (isJoined) {
        socket.emit("disconnect");
      }
    };
  }, [userName, isJoined]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("sendmessage", { userName, message });
      setMessage(""); // Clear input after sending
    }
  };

  const handleJoinChat = (e) => {
    e.preventDefault();
    if (userName.trim()) {
      setIsJoined(true);
      socket.emit("join", { userName });
    }
  };

  const preventEnterKeySubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission on "Enter" key press
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Customer Care Help</h2>
      <div className="chat-container d-flex flex-column justify-content-between border p-3 rounded shadow-sm">
        <div className="chat-box mb-3" style={{ height: '300px', overflowY: 'scroll' }}>
          {messages.map((msg, index) => (
            <div key={index} className={`mb-2 p-2 ${msg.userName === userName ? 'bg-info text-white' : 'bg-light'}`}>
              <strong>{msg.userName}</strong>: {msg.message}
            </div>
          ))}
        </div>

        {/* Conditional rendering based on whether the user has joined the chat */}
        {!isJoined ? (
          <form onSubmit={handleJoinChat} className="d-flex">
            <input
              type="text"
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onKeyDown={preventEnterKeySubmit} // Prevent form submission on Enter key press
              required
              className="form-control me-2"
            />
            <button type="submit" className="btn btn-primary" disabled={!userName.trim()}>
              Join Chat
            </button>
          </form>
        ) : (
          <form onSubmit={sendMessage} className="d-flex">
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="form-control me-2"
            />
            <button type="submit" className="btn btn-success" disabled={!message.trim()}>
              Send
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CustomerCare;
