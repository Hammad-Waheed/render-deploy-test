// repositories/userRepository.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');


exports.findAll = async () => {
    return await User.find();
};

exports.findById = async (id) => {
    return await User.findById(id);
};

// Create a new user and return the user along with a JWT token
exports.create = async (userData) => {
    const user = new User(userData);
    const savedUser = await user.save();
    return savedUser;
};

exports.update = async (id, updateData) => {
    return await User.findByIdAndUpdate(id, updateData, { new: true });
};

exports.delete = async (id) => {
    return await User.findByIdAndDelete(id);
};

// Find a user by email
exports.findByEmail = async (email) => {
    return await User.findOne({ email });
};
