const Location = require('../models/Location');
exports.createLocation = async (req, res, next) => {
    try {
      const { name } = req.body;
  
      if (!name) {
        return res.status(400).json({ success: false, message: 'Location name is required' });
      }
  
      const newLocation = new Location({ name });
      const savedLocation = await newLocation.save();
  
      res.status(201).json({ success: true, data: savedLocation });
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
  
  exports.getLocations = async (req, res, next) => {
    try {
      const locations = await Location.find();
      res.status(200).json({ success: true, data: locations });
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
  