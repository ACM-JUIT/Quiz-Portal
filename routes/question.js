const express = require('express');
const router = express.Router();
const questionController = require('../controllers/question');

router.post('/', addQuestion);             // Create Question

function addQuestion(req, res, next) {
    questionController.create(req.body)
        .then(() => res.json({"message": "Question Added"}))
        .catch(err => next(err));
}

module.exports = router;