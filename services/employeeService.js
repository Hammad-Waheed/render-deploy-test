const employeeRepository = require('../repositories/employeeRepository');

exports.createEmployee = async (employeeData) => {
  return await employeeRepository.create(employeeData);
};

exports.getEmployeeById = async (id) => {
  return await employeeRepository.findById(id);
};

exports.getAllEmployees = async () => {
  return await employeeRepository.findAll();
};

exports.updateEmployee = async (id, updateData) => {
  return await employeeRepository.updateById(id, updateData);
};

exports.deleteEmployee = async (id) => {
  return await employeeRepository.deleteById(id);
};
