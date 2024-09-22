const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);

const wss1 = new WebSocket.Server({ server, path: '/ws1' });


wss1.on('connection', (ws) => {
    console.log('Client connected to WebSocket Server 1');
    ws.on('message', (message) => {
        console.log(`Received message from WS1: ${message}`);
        ws.send(`Echo from WS1: ${message}`);
    });
    ws.on('close', () => {
        console.log('Client disconnected from WebSocket Server 1');
    });
});

wss1.on('connection', (ws) => {
    console.log('Client connected to WebSocket Server 2');
    ws.on('message', (message) => {
        console.log(`Received message from WS2: ${message}`);
        ws.send(`Echo from WS2: ${message}`);
    });
    ws.on('close', () => {
        console.log('Client disconnected from WebSocket Server 2');
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
