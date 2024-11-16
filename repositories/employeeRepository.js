const Employee = require('../models/Employee');

// Save a new employee
exports.create = async (employeeData) => {
  const employee = new Employee(employeeData);
  return await employee.save();
};

// Get an employee by ID
exports.findById = async (id) => {
  return await Employee.findById(id);
};

// Get all employees
exports.findAll = async () => {
  return await Employee.find();
};

// Update an employee by ID
exports.updateById = async (id, updateData) => {
  return await Employee.findByIdAndUpdate(id, updateData, { new: true });
};

// Delete an employee by ID
exports.deleteById = async (id) => {
  return await Employee.findByIdAndDelete(id);
};
