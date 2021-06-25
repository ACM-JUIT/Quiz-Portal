const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quiz');

router.get('/getQuestion', getQuestion);
router.post('/checkAnswer', checkAnswer);

function getQuestion(req, res, next) {
    quizController.getQuestion(req.body)
        .then(ques => ques ? res.json(ques) : res.status(400).json({ message: 'Internal Error' }))
        .catch(err => next(err));
}

function checkAnswer(req, res, next) {
    quizController.checkAnswer(req.body)
    .then(ans => ans ? res.json(ans) : res.status(400).json({ message: 'Incorrect Answer' }))
    .catch(err => next(err));
}

module.exports = router;