const Questionnaire = require('../models/Questionnaire');

exports.create = async (questionnaireData) => {
  const questionnaire = new Questionnaire(questionnaireData);
  return await questionnaire.save();
};

exports.findById = async (id) => {
  return await Questionnaire.findById(id).populate('employeeId');
};

exports.findByEmployeeId = async (employeeId) => {
  return await Questionnaire.find({ employeeId }).populate('employeeId');
};

exports.findAll = async () => {
  return await Questionnaire.find().populate('employeeId');
};

exports.updateById = async (id, updateData) => {
  return await Questionnaire.findByIdAndUpdate(id, updateData, { new: true });
};

exports.deleteById = async (id) => {
  return await Questionnaire.findByIdAndDelete(id);
};
