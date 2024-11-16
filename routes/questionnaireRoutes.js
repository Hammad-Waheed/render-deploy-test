const express = require('express');
const router = express.Router();
const questionnaireController = require('../controllers/questionnaireController');

// Questionnaire routes
router.route('/')
  .get(questionnaireController.getAllQuestionnaires)  // Get all questionnaires
  .post(questionnaireController.createEmployeeAndQuestionnaire); // Create a new questionnaire

router.route('/:id')
  .get(questionnaireController.getQuestionnaireById)  // Get questionnaire by ID
  .put(questionnaireController.updateQuestionnaire)   // Update questionnaire by ID
  .delete(questionnaireController.deleteQuestionnaire); // Delete questionnaire by ID

router.route('/employee/:employeeId')
  .get(questionnaireController.getEmployeeQuestionnaires); // Get questionnaires for an employee

module.exports = router;
