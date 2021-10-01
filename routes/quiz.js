const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quiz');

router.post('/getQuestion', userVerification, getQuestion);
router.post('/checkAnswer', userVerification, checkAnswer);
router.post('/leaderboard', leaderboard);
router.post('/skipQuestion', userVerification, skipQuestion);

const getQuestion = (req, res, next) => {
    quizController.getQuestion(req.body)
        .then(ques => ques ? res.json(ques) : res.status(500).json({ message: 'Internal Error' }))
        .catch(err => next(err));
}

function checkAnswer(req, res, next) {
    quizController.checkAnswer(req.body)
    .then(ans => ans ? res.json(ans) : res.status(500).json({ message: 'Internal Error' }))
    .catch(err => next(err));
}

function leaderboard(req, res, next) {
    quizController.leaderboard(req.body)
    .then(users => users ? res.json(users) : res.status(500).json({ message: 'Internal Error' }))
    .catch(err => next(err));
}

function skipQuestion(req, res, next) {
    quizController.skipQuestion(req.body)
    .then(result => result ? res.json(result) : res.status(500).json({ message: 'Internal Error' }))
    .catch(err => next(err));
}

function userVerification(req, res, next) {
    if(req.user.id==req.body.id){
        next();
    }else{
        res.send("Verification Failed. Trying to hack?");
    }
}

module.exports = router;
