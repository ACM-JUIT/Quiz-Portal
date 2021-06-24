const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/authenticate', authenticate);
router.post('/register', register);

function authenticate(req, res, next) {
    userController.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    userController.register(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

module.exports = router;