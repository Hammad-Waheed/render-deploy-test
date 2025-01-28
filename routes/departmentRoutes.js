const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const { authenticate } = require('../middlewares/authMiddleware');

router.route('/')
.post(authenticate, departmentController.createDepartment)
.get(authenticate, departmentController.getDepartments);

module.exports = router;
