const WebSocket = require("ws");

module.exports = function broadcastMessage(data,map) {

    const datax = JSON.parse(data);


    const  client = map.get(datax.id)

    if (client && client.readyState === WebSocket.OPEN){
        client.send(datax.message);
    }

}


