const WebSocket = require('ws');
const wsMiddleware = require("../utilities/wsMiddleWare");
const { v4: uuidv4 } = require('uuid');
const broadcast = require('../broadcast/BroadcastChat');

const ChatSocket=(websocket)=>{

    const  map = new Map();
    websocket.on('connection', (ws, req) => {
        wsMiddleware(ws, req)
            .then(() => {
                const id = uuidv4();
                map.set(id, ws);
                console.log(`Client connected: ${id}`);

                ws.on('message', (message) => {
                    console.log(`Received message: ${message}`);
                    // Broadcast the message to other clients
                    broadcast(message);
                });

                ws.on('close', () => {
                    console.log('Client disconnected.');
                    map.delete(id);
                });
            })
            .catch((err) => {
                console.error('WebSocket connection failed:', err);
                ws.close(1008, err); // Close with policy violation
            });
    });
}

module.exports = ChatSocket;