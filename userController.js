// controllers/userController.js
const userService = require('../services/userService');

exports.getUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        next(error);
    }
};

exports.getUser = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
};

exports.createUser = async (req, res, next) => {
    try {
        const { name, email, password, phone, dateOfBirth, sex, address, role } = req.body;

        const result = await userService.createUser({
            name,
            email,
            password,
            phone,
            dateOfBirth,
            sex,
            address,
            role
        });

        res.status(201).json({
            success: true,
            data: result // Only the result from the service
        });
    } catch (error) {
        next(error); // Pass errors to the global error handler
    }
};
// Controller for user login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await userService.loginUser(email, password);

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: result
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        await userService.deleteUser(req.params.id);
        res.status(204).json({ success: true, data: null });
    } catch (error) {
        next(error);
    }
};
