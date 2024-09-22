const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const postSchema = require('../model/Post');

// Define the User schema
const userSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4, // Generate UUID for user id
    },
    step: {
        type: Number,
        default: 0,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    interests: {
        type: [String],
        default: [],
    },
    gender: {
        type: Number, // 0 for male, 1 for female
        required: true,
    },
    dateOfBirth: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        default: '',
    },
    profilePictureUrl: {
        type: String,
        default: '',
    },
    cardPictureUrl: {
        type: String,
        default: '',
    },
    requestsSent: {
        type: [String],
        default: [],
    },
    requests: {
        type: [String],
        default: [],
    },
    collegeId: {
        type: Number,
        required: true,
    },
    collegeName: {
        type: String,
        required: true,
    },
    matched: {
        type: [String],
        default: [],
    },
    profileAccess: {
        type: [String],
        default: [],
    },
    posts: {
        type: [postSchema], // Embed posts using the postSchema
        default: [],
    },
    chats: {
        type: [String], // Storing chat IDs as UUIDs
        default: [],
    }
}, {
    collection: 'users', // Specify the collection name explicitly if needed
});


// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
