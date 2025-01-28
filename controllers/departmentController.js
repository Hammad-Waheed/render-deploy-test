const Department = require('../models/Department');
exports.createDepartment = async (req, res, next) => {
    try {
      const { name } = req.body;
  
      if (!name) {
        return res.status(400).json({ success: false, message: 'Department name is required' });
      }
  
      const newDepartment = new Department({ name });
      const savedDepartment = await newDepartment.save();
  
      res.status(201).json({ success: true, data: savedDepartment });
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
  
  exports.getDepartments = async (req, res, next) => {
    try {
      const departments = await Department.find();
      res.status(200).json({ success: true, data: departments });
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
  