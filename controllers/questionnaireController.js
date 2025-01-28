
const employeeService = require('../services/employeeService');
const questionnaireService = require('../services/questionnaireService');
const Employer = require('../models/Employer'); // Import Employer Model
const Department = require('../models/Department'); // Import Department Model
const Location = require('../models/Location'); // Import Location Model
const Employee = require('../models/Employee'); // Import Employee Model

exports.createEmployeeAndQuestionnaire = async (req, res, next) => {
  try {
    const { employeeData, questionnaireData } = req.body;

    // Validate required payloads
    if (!employeeData || !questionnaireData) {
      return res.status(400).json({ 
        success: false, 
        message: "Both 'employeeData' and 'questionnaireData' are required." 
      });
    }

    if (!employeeData.userId) {
      return res.status(400).json({ 
        success: false, 
        message: "'userId' is required in 'employeeData'." 
      });
    }

    if (!questionnaireData.testDate) {
      return res.status(400).json({ 
        success: false, 
        message: "'testDate' is required in 'questionnaireData'." 
      });
    }

    // Find or create employer, department, and location
    const employer = await Employer.findOne({ name: employeeData.employerName }) ||
      await Employer.create({ name: employeeData.employerName });
    
    const department = employeeData.department
      ? await Department.findOne({ name: employeeData.department }) ||
        await Department.create({ name: employeeData.department })
      : null;

    const location = employeeData.location
      ? await Location.findOne({ name: employeeData.location }) ||
        await Location.create({ name: employeeData.location })
      : null;

    // Create Employee
    const employeePayload = {
      userId: employeeData.userId,
      employer: employer._id,
      department: department ? department._id : null,
      location: location ? location._id : null,
      jobTitle: employeeData.jobTitle,
    };

    const createdEmployee = await employeeService.createEmployee(employeePayload);

    // Attach Employee ID to Questionnaire
    questionnaireData.employeeId = createdEmployee._id;

    // Provide defaults for airProtectorAvailable if not provided
    questionnaireData.airProtectorAvailable = questionnaireData.airProtectorAvailable || {
      hasAvailable: false,
      wearProtector: false,
      earPlugs: false,
      earCaps: false,
      headphones: false,
      earDefenders: false,
    };

    const createdQuestionnaire = await questionnaireService.createQuestionnaire(questionnaireData);

    // Populate the response
    const populatedEmployee = await Employee.findById(createdEmployee._id)
      .populate('employer', 'name')
      .populate('department', 'name')
      .populate('location', 'name');

    res.status(201).json({
      success: true,
      data: {
        employee: populatedEmployee,
        questionnaire: createdQuestionnaire,
      },
    });
  } catch (error) {
    console.error(error);
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
