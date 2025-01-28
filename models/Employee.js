const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'Employer', required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
  jobTitle: { type: String },
});

module.exports = mongoose.model('Employee', EmployeeSchema);
