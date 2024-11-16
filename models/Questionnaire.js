const mongoose = require('mongoose');

const QuestionnaireSchema = new mongoose.Schema({
  employeeId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Employee', 
    required: true 
  },
  exposureToLoudNoise: {
    last24Hours: { type: Boolean, required: true },
    neededToShout: { type: Boolean },
    warningMessageShown: { type: Boolean }
  },
  hearingProblem: {
    hasProblem: { type: Boolean },
    affectedEar: { type: String, enum: ['left', 'right'] }
  },
  healthIssues: {
    highBloodPressure: { type: Boolean },
    diabetes: { type: Boolean },
    previousStroke: { type: Boolean },
    familyHistory: { type: Boolean },
    recurrentEarInfections: { type: Boolean },
    earProblems: {
      tinnitus: { type: Boolean },
      earPain: { type: Boolean },
      dizziness: { type: Boolean },
      earSurgeries: [
        {
          surgeryType: { type: String },
          knownDetails: { type: String }
        }
      ]
    }
  },
  testDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Questionnaire', QuestionnaireSchema);
