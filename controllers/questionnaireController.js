
const employeeService = require('../services/employeeService');
const questionnaireService = require('../services/questionnaireService');

exports.createEmployeeAndQuestionnaire = async (req, res, next) => {
  try {
    // Step 1: Create the Employee
    const { employeeData, questionnaireData } = req.body;

    if (!employeeData || !questionnaireData) {
      return res.status(400).json({ 
        success: false, 
        message: "Both 'employeeData' and 'questionnaireData' are required" 
      });
    }

    const createdEmployee = await employeeService.createEmployee(employeeData);

    // Step 2: Attach employee ID to the Questionnaire data
    questionnaireData.employeeId = createdEmployee._id;

    // Step 3: Create the Questionnaire
    const createdQuestionnaire = await questionnaireService.createQuestionnaire(questionnaireData);

    res.status(201).json({
      success: true,
      data: {
        employee: createdEmployee,
        questionnaire: createdQuestionnaire
      }
    });
  } catch (error) {
    next(error);
  }
};


exports.createQuestionnaire = async (req, res, next) => {
  try {
    const questionnaire = await questionnaireService.createQuestionnaire(req.body);
    res.status(201).json({ success: true, data: questionnaire });
  } catch (error) {
    next(error);
  }
};

exports.getQuestionnaireById = async (req, res, next) => {
  try {
    const questionnaire = await questionnaireService.getQuestionnaireById(req.params.id);
    if (!questionnaire) {
      return res.status(404).json({ success: false, message: 'Questionnaire not found' });
    }
    res.status(200).json({ success: true, data: questionnaire });
  } catch (error) {
    next(error);
  }
};

exports.getEmployeeQuestionnaires = async (req, res, next) => {
  try {
    const questionnaires = await questionnaireService.getEmployeeQuestionnaires(req.params.employeeId);
    res.status(200).json({ success: true, data: questionnaires });
  } catch (error) {
    next(error);
  }
};

exports.getAllQuestionnaires = async (req, res, next) => {
  try {
    const questionnaires = await questionnaireService.getAllQuestionnaires();
    res.status(200).json({ success: true, data: questionnaires });
  } catch (error) {
    next(error);
  }
};

exports.updateQuestionnaire = async (req, res, next) => {
  try {
    const updatedQuestionnaire = await questionnaireService.updateQuestionnaire(req.params.id, req.body);
    if (!updatedQuestionnaire) {
      return res.status(404).json({ success: false, message: 'Questionnaire not found' });
    }
    res.status(200).json({ success: true, data: updatedQuestionnaire });
  } catch (error) {
    next(error);
  }
};

exports.deleteQuestionnaire = async (req, res, next) => {
  try {
    const deletedQuestionnaire = await questionnaireService.deleteQuestionnaire(req.params.id);
    if (!deletedQuestionnaire) {
      return res.status(404).json({ success: false, message: 'Questionnaire not found' });
    }
    res.status(200).json({ success: true, data: deletedQuestionnaire });
  } catch (error) {
    next(error);
  }
};
