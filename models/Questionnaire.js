const mongoose = require('mongoose');

const QuestionnaireSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  exposureToLoudNoise: {
    last24Hours: { type: Boolean },
    neededToShout: { type: Boolean },
    warningMessageShown: { type: Boolean },
  },
  hearingProblem: {
    hasProblem: { type: Boolean },
    affectedEar: { type: String },
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
          knownDetails: { type: String },
        },
      ],
    },
  },
  airProtectorAvailable: {
    hasAvailable: { type: Boolean },
    wearProtector: { type: Boolean },
    earPlugs: { type: Boolean },
    earCaps: { type: Boolean },
    headphones: { type: Boolean },
    earDefenders: { type: Boolean },
  },
  coldInLast14Days: { type: Boolean }, 
  testDate: { type: Date },
});

module.exports = mongoose.model('Questionnaire', QuestionnaireSchema);
