const express = require('express');
const router = express.Router();
const employerController = require('../controllers/employerController');
const { authenticate } = require('../middlewares/authMiddleware');

router.route('/')
.post(authenticate, employerController.createEmployer)
.get(authenticate, employerController.getEmployers);

module.exports = router;
