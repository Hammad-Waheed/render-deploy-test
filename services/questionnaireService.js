const questionnaireRepository = require('../repositories/questionnaireRepository');

exports.createQuestionnaire = async (questionnaireData) => {
  return await questionnaireRepository.create(questionnaireData);
};

exports.getQuestionnaireById = async (id) => {
  return await questionnaireRepository.findById(id);
};

exports.getEmployeeQuestionnaires = async (employeeId) => {
  return await questionnaireRepository.findByEmployeeId(employeeId);
};

exports.getAllQuestionnaires = async () => {
  return await questionnaireRepository.findAll();
};

exports.updateQuestionnaire = async (id, updateData) => {
  return await questionnaireRepository.updateById(id, updateData);
};

exports.deleteQuestionnaire = async (id) => {
  return await questionnaireRepository.deleteById(id);
};
