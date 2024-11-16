const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  employerName: { type: String, required: true },
  department: { type: String },
  location: { type: String },
  jobTitle: { type: String },
});

module.exports = mongoose.model('Employee', EmployeeSchema);
