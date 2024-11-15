const express = require('express');
const userController = require('../controllers/userController');
const { authenticate } = require('../middlewares/authMiddleware');
const router = express.Router();

// Public routes
router.route('/')
    .post(userController.createUser); // User registration/signup

// Protected routes (requires authentication)
router.use(authenticate);
router.route('/login')
    .post(userController.loginUser); // For login
router.route('/')
    .get(userController.getUsers); // Get all users

router.route('/:id')
    .get(userController.getUser) // Get user by ID
    .put(userController.updateUser) // Update user by ID
    .delete(userController.deleteUser); // Delete user by ID

module.exports = router;
