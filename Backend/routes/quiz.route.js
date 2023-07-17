const express = require('express');
const quizRouter = express.Router();
const Quiz = require('../models/quiz.model');

// Middleware to handle quiz creation
quizRouter.post('/register', async (req, res) => {
  try {
    const { creator, title, description, questions } = req.body;
    const quiz = await Quiz.create({ creator, title, description, questions });
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
    res.status(500).json({ "message": 'Failed to create quiz' });
  }
});

// api routes to fetch quiz data
quizRouter.get('/api/quiz',async (req, res) => {
    try{
        const quizzes = await Quiz.find();
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json({ message: error.message });
        res.status(500).json({ 'message': 'Failed to retrieve quiz data'});
    }
})

// Middleware to handle quiz deletion
quizRouter.delete('/:quizId', async (req, res) => {
  try {
    const { quizId } = req.params;
    await Quiz.findByIdAndDelete(quizId);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete quiz' });
  }
});

// Middleware to handle quiz update
quizRouter.put('/:quizId', async (req, res) => {
  try {
    const { quizId } = req.params;
    const { title, description } = req.body;
    const quiz = await Quiz.findByIdAndUpdate(
      quizId,
      { title, description },
      { new: true }
    );
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update quiz' });
  }
});

module.exports = {quizRouter};
