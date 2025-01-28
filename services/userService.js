// services/userService.js
const userRepository = require('../repositories/userRepository');
const AppError = require('../utils/AppError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
exports.getAllUsers = async () => {
    return await userRepository.findAll();
};

exports.getUserById = async (id) => {
    try {
        // Attempt to find the user by ID
        const user = await userRepository.findById(id);

        // Check if the user exists
        if (!user) {
            throw new AppError('User not found', 404);
        }

        return user;
    } catch (error) {
        // Handle invalid ID errors (e.g., invalid MongoDB ObjectId format)
        if (error.name === 'CastError' || error.code === 'INVALID_ID') {
            throw new AppError('Invalid user ID', 400); // Bad request
        }

        // Re-throw unexpected errors for global error handling
        throw error;
    }
};

exports.createUser = async (userData) => {
    try {
        // Define required fields for user and address
        const requiredFields = ['name', 'email', 'password', 'phone', 'dateOfBirth', 'sex'];
        const requiredAddressFields = ['houseNumber', 'street', 'townCity', 'county', 'country', 'postcode'];

        // Check for missing required user fields
        for (const field of requiredFields) {
            if (!userData[field]) {
                throw new AppError(`${field} is required`, 400);
            }
        }

        // Check for missing required address fields
        if (!userData.address) {
            throw new AppError('Address is required', 400);
        }
        for (const field of requiredAddressFields) {
            if (!userData.address[field]) {
                throw new AppError(`Address field '${field}' is required`, 400);
            }
        }

        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(userData.password, salt);

        // Check if email already exists
        const emailExist = await userRepository.findByEmail(userData.email);
        if (emailExist) {
            throw new AppError('Email already exists. Please use a different email.', 400);
        }

        // Save user
        const savedUser = await userRepository.create(userData);

        // Generate JWT token
        const token = jwt.sign(
            { id: savedUser._id, email: savedUser.email, role: savedUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return { user: savedUser, token };
    } catch (error) {
        throw error; // Re-throw other errors
    }
};




// Service to validate user credentials and generate JWT
exports.loginUser = async (email, password) => {
    const user = await userRepository.findByEmail(email);
    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    return { user, token };
};

exports.updateUser = async (id, updateData) => {
    try {
        // Attempt to update the user
        const updatedUser = await userRepository.update(id, updateData);

        // Handle the case where the user does not exist
        if (!updatedUser) {
            throw new AppError('User not found', 404);
        }

        return updatedUser;
    } catch (error) {
        // Handle invalid IDs or other specific errors thrown by the repository
        if (error.name === 'CastError' || error.code === 'INVALID_ID') {
            throw new AppError('Invalid user ID', 400); // Bad request
        }

        // Re-throw unexpected errors for global error handling
        throw error;
    }
};

exports.deleteUser = async (id) => {
    const deletedUser = await userRepository.delete(id);
    if (!deletedUser) throw new AppError('User not found', 404);
    return deletedUser;
};
