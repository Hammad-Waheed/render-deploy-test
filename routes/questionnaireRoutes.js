const express = require('express');
const router = express.Router();
const questionnaireController = require('../controllers/questionnaireController');
const { authenticate } = require('../middlewares/authMiddleware');
// Questionnaire routes
router.route('/')
  .get(authenticate, questionnaireController.getAllQuestionnaires)  // Get all questionnaires
  .post(authenticate, questionnaireController.createEmployeeAndQuestionnaire); // Create a new questionnaire

router.route('/:id')
  .get(authenticate, questionnaireController.getQuestionnaireById)  // Get questionnaire by ID
  .put(authenticate, questionnaireController.updateQuestionnaire)   // Update questionnaire by ID
  .delete(authenticate, questionnaireController.deleteQuestionnaire); // Delete questionnaire by ID

router.route('/employee/:employeeId')
  .get(authenticate, questionnaireController.getEmployeeQuestionnaires); // Get questionnaires for an employee

module.exports = router;
