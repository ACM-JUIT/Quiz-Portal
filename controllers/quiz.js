const Question = require('../models/question');
const Quiz = require('../models/quiz');
require('dotenv').config();


async function getQuestion(quizParam) {
    // finding on which question the user is
    const user = await Quiz.findOne({ user_id: quizParam.id });

    // getting the question
    const question = await Question.findOne({ questionIndex: user.current_question });
    return {
        ...question.getQuestion(user.question_type)
    };
}

async function checkAnswer(quizParam) {

    // finding on which question the user is
    const user = await Quiz.findOne({ user_id: quizParam.id });

    // getting the question
    const question = await Question.findOne({ questionIndex: user.current_question });
    
    //Checking if the answer is correct
    if(quizParam.answer == question.checkAnswer(user.question_type)){

        //Updating to next Question
        var userParam = user;
        userParam.current_question = user.current_question + 1;

        Object.assign(user, userParam);
        await user.save();

        return {"Message": "Corrent"};
    }
    else {
        return {"Message": "Wrong"};
    };
}

module.exports ={
    getQuestion,
    checkAnswer
}