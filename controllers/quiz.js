const Question = require('../models/question');
const Quiz = require('../models/quiz');
require('dotenv').config();


async function getQuestion(quizParam) {
    // finding on which question the user is
    const user = await Quiz.findOne({ user_id: quizParam.id });

    // getting the question
    const question = await Question.findOne({ questionIndex: user.current_question });
    return {
        ...question.getQuestion(question.questionType)
    };
}

async function checkAnswer(quizParam) {

    // finding on which question the user is
    const user = await Quiz.findOne({ user_id: quizParam.id });

    // getting the question
    const question = await Question.findOne({ questionIndex: user.current_question });
    
    //Checking if the answer is correct
    if(quizParam.answer == question.checkAnswer(question.questionType)){

        //Updating to next Question
        var userParam = user;
        userParam.current_question = user.current_question + 1;
        userParam.last_submit_date = Date.now;

        Object.assign(user, userParam);
        await user.save();

        return {"Message": "Corrent"};
    }
    else {
        return {"Message": "Wrong"};
    };
}

async function leaderboard() {
    return await Quiz.find({},{ user_id: 0, _id: 0 }).sort({"current_question":-1,"last_submit_date":1})
}

module.exports ={
    getQuestion,
    checkAnswer,
    leaderboard
}