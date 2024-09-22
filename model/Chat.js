const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Define the Chat schema
const chatSchema = new mongoose.Schema({
    chatId: {
        type: String,
        default: uuidv4, // Generate UUID for each chat
    },
    messages: {
        type: [String],
        default: []
    },
    newMessages: {
        type: [String], // Array of new message IDs or content
        default: [],    // Default to an empty array
    }
}, {
    collection: 'chats', // Specify the collection name
});

// Create the Chat model
const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
