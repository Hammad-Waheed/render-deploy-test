const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Employee routes
router.route('/')
  .get(employeeController.getAllEmployees)   // Get all employees
  .post(employeeController.createEmployee); // Create a new employee

router.route('/:id')
  .get(employeeController.getEmployeeById)  // Get employee by ID
  .put(employeeController.updateEmployee)   // Update employee by ID
  .delete(employeeController.deleteEmployee); // Delete employee by ID

module.exports = router;
