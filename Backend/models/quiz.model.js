const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    answerOptions: {
        type: [String],
        required: true,
    },
    correctOptions: {
        type: [Number],
        required: true,
    },
});

const quizSchema = new mongoose.Schema({
    creator: {
        type: String,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    questions: {
        type: [questionSchema],
        required: true,
        validate: [arrayLimit, 'Quizzes must have between 2 and 10 questions.'],
    },
});

function arrayLimit(val) {
    return val.length >= 2 && val.length <= 10;
}

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
