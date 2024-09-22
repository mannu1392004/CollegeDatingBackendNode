const express = require('express');
const WebSocket = require('ws');
const mongoose = require("mongoose");
const JwtUtil = require("../utilities/jwtUtil");
const ChatSocket = require("../websockets/ChatSocket");
const InterfaceWebSocket = require("../websockets/interfaceSocket");
const http = require('http');

// Set up the Express app
const app = express();
const port = 3000;
const jwtUtil = new JwtUtil();

// MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/collegeDating';

// Connect to MongoDB
mongoose.connect(mongoURI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

console.log(jwtUtil.generateAccessToken("mannu"));

app.use(express.static('public'));

// Create an HTTP server from the Express app
const server = http.createServer(app);

// Start the HTTP server
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


const wssChat = new WebSocket.Server({ server, path: '/chat', perMessageDeflate: true});
ChatSocket(wssChat);  // Function handling /chat WebSocket logic


const wssInterface = new WebSocket.Server({ server, path: '/interface', perMessageDeflate: true });
InterfaceWebSocket(wssInterface);  // Function handling /interface WebSocket logic
