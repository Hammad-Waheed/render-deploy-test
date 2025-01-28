const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');
const { authenticate } = require('../middlewares/authMiddleware');

router.route('/')
.post(authenticate, locationController.createLocation)
.get(authenticate, locationController.getLocations);

module.exports = router;
