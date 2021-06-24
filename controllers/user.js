const User = require('../models/user');
const Quiz = require('../models/quiz');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function authenticate({ username, password }) {
    // finding the use detail
    const user = await User.findOne({ username });

    // validating password and checking if user exists
    if (user && bcrypt.compareSync(password, user.password)) {
        //Creating A Token
        const token = jwt.sign({ sub: user.username }, process.env.JWT_SECRET, { expiresIn: '86400s' });

        return {
            ...user.toJSON(),
            token
        };
    }
}

async function register(userParam) {
    // check if username can be taken
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const user = new User(userParam);

    // hashing the password
    if (userParam.password) {
        user.password = bcrypt.hashSync(userParam.password, 10);
    }

    // saving the user
    await user.save();

    // register for quiz
    const quiz = new Quiz({user_id: user.id, user_name: user.username });
    await quiz.save ();
}

module.exports ={
    authenticate,
    register
}
