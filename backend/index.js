const express = require('express');
const cors = require('cors');
const mongodb = require('./connect'); // Import MongoDB connection
const mongoose = require('mongoose'); // Import mongoose for models
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const port = 5000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Frontend URL
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors({ origin: 'http://localhost:3000' })); // Allow requests from frontend
app.use(express.json({ limit: '10mb' })); // Accept JSON body with a limit

// Connect to MongoDB
mongodb()
  .then(() => {
    // Start the server only after successful MongoDB connection
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Test Route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// User Routes (assuming these are defined in separate files)
app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));
app.use('/api', require('./Routes/CategoryRoute'));
app.use('/api', require('./Routes/Ordermail'));

// Route to handle data upload
app.post('/upload', async (req, res) => {
  try {
      const { categoryName, name, img, options, description } = req.body;

      // Basic validation
      if (!categoryName || !name || !img || !options || options.length === 0) {
          return res.status(400).json({ message: 'Please fill in all required fields: Category Name, Item Name, Image URL, and Options.' });
      }

      // Check that at least one price in options is provided
      const hasPrice = options.some(option => Object.values(option).some(price => price));
      if (!hasPrice) {
          return res.status(400).json({ message: 'Please provide at least one price in the options.' });
      }

      // Prepare data to be saved
      const itemData = {
          CategoryName: categoryName,
          name,
          img,
          options,
          description: description || '', // Optional field
      };

      // Insert data into the 'data' collection
      const result = await mongoose.connection.db.collection('data').insertOne(itemData);
      
      res.json({ message: 'Item uploaded successfully', data: result });
  } catch (error) {
      console.error('Error in /upload route:', error); // Log the specific error
      res.status(500).json({ message: 'Error uploading data', error: error.message }); // Send detailed error message
  }
});

const users = {}; // To store userName and their socket ID

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("join", ({ userName }) => {
    users[userName] = socket.id;
    console.log(`${userName} joined the chat`);
    socket.broadcast.emit("message", { userName: "System", message: `${userName} has joined the chat` });
  });

  socket.on("sendmessage", ({ userName, message, toUser }) => {
    if (toUser) {
      // Send message to the specific user
      const targetSocketId = users[toUser];
      if (targetSocketId) {
        io.to(targetSocketId).emit("message", { userName, message });
      }
    } else {
      // Broadcast to all users if no specific user is selected
      io.emit("message", { userName, message });
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
    for (let user in users) {
      if (users[user] === socket.id) {
        delete users[user];
        break;
      }
    }
  });
});
server.listen(5010, () => console.log(`Socket server is running on ${5010}`));
