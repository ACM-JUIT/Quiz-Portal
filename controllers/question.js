const Question = require('../models/question');
require('dotenv').config();

async function create(questionParam) {
    
    // check if question with same number exists
    if (await Question.findOne({ questionIndex: questionParam.questionIndex })) {
        throw 'Question Index "' + questionParam.questionIndex + '" already exists.';
    }

    const question = new Question(questionParam);

    // saving the user
    await question.save();
}

module.exports ={
    create
}
