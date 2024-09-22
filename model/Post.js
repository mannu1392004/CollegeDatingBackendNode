const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Define the Posts schema
const postSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4, // Generate UUID for each post
    },
    username: {
        type: String,
        required: true,
    },
    postImage: {
        type: String,
        required: true,
    },
    postText: {
        type: String,
        required: true,
    },
    dateTime: {
        type: String, // Store date and time using the Date type
        required:true, // Default to current date/time
    }
}, {
    collection: 'posts' // Specify collection if needed
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;