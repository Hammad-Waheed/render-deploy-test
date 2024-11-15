// services/userService.js
const userRepository = require('../repositories/userRepository');
const AppError = require('../utils/AppError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
exports.getAllUsers = async () => {
    return await userRepository.findAll();
};

exports.getUserById = async (id) => {
    const user = await userRepository.findById(id);
    if (!user) throw new AppError('User not found', 404);
    return user;
};

exports.createUser = async (userData) => {
    try {
         // Check for missing required fields
         const requiredFields = ['name', 'email', 'password', 'phone', 'dateOfBirth', 'sex', 'address'];
         for (const field of requiredFields) {
             if (!userData[field]) {
                 throw new AppError(`${field} is required`, 400);  // Customize the error message to indicate which field is missing
             }
         }
        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(userData.password, salt);
        emailExist = await userRepository.findByEmail(userData.email);
        if(emailExist){
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
    const updatedUser = await userRepository.update(id, updateData);
    if (!updatedUser) throw new AppError('User not found', 404);
    return updatedUser;
};

exports.deleteUser = async (id) => {
    const deletedUser = await userRepository.delete(id);
    if (!deletedUser) throw new AppError('User not found', 404);
    return deletedUser;
};
