const express = require('express');
const userController = require('../controllers/userController');
const { authenticate } = require('../middlewares/authMiddleware');
const router = express.Router();

// Public routes
router.route('/')
    .post(userController.createUser); // User registration/signup
router.route('/login')
    .post(userController.loginUser); // For login
// Protected routes (requires authentication)

router.route('/')
    .get(authenticate, userController.getUsers); // Get all users

router.route('/:id')
    .get(authenticate, userController.getUser) // Get user by ID
    .put(authenticate, userController.updateUser) // Update user by ID
    .delete(authenticate, userController.deleteUser); // Delete user by ID

module.exports = router;
