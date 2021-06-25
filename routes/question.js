const express = require('express');
const router = express.Router();
const questionController = require('../controllers/question');

router.get('/', getAllQuestion);           // Get all Questions
router.get('/:id', getQuesion);            // Get A Question
router.put('/:id', updateQuestion);        // Update Question
router.delete('/:id', deleteQuestion);     // Delete Question

router.post('/', addQuestion);             // Create Question

function getAllQuestion(req, res, next) {

}

function getQuesion(req, res, next) {

}

function addQuestion(req, res, next) {
    questionController.create(req.body)
        .then(() => res.json({"messgae": "Question Added"}))
        .catch(err => next(err));
}

function updateQuestion(req, res, next) {

}

function deleteQuestion(req, res, next) {

}

module.exports = router;