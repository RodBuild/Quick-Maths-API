const mongoose = require('mongoose');

const EasyChallengeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title entry is needed'],
    },
    description: {
      type: String,
      required: false,
    },
    formula: {
      type: String,
      required: [true, 'Formula entry is needed'],
    },
    answer: {
      type: String,
      required: [true, 'Answer entry is needed'],
    },
    picture: {
      type: String,
    },
    points: {
      type: String,
      min: [1, 'Question cannot be worth at least 1 point'],
      max: [10, 'Question cannot be worth more than 10 points'],
      required: [true, 'Points entry is needed'],
    },
  },
  { collection: 'test' }
);

const EasyChallenge = mongoose.model('EasyChallenge', EasyChallengeSchema);

module.exports = EasyChallenge;
