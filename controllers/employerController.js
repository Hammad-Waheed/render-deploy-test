const Employer = require('../models/Employer');
exports.createEmployer = async (req, res, next) => {
    try {
      const { name } = req.body;
  
      if (!name) {
        return res.status(400).json({ success: false, message: 'Employer name is required' });
      }
  
      const newEmployer = new Employer({ name });
      const savedEmployer = await newEmployer.save();
  
      res.status(201).json({ success: true, data: savedEmployer });
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
  
  exports.getEmployers = async (req, res, next) => {
    try {
      const employers = await Employer.find();
      res.status(200).json({ success: true, data: employers });
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
  