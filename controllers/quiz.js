const Question = require('../models/question');
const Quiz = require('../models/quiz');
require('dotenv').config();


async function getQuestion(quizParam) {
    // finding on which question the user is
    const user = await Quiz.findOne({ user_id: quizParam.id });
    if(user.current_question > process.env.total_question )
    return{
        message: "Quiz Completed"
    }
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

        //Updating to next Question and increase a score
        var userParam = user;
        userParam.current_question = user.current_question + 1;
        userParam.score = user.score + 1;
        userParam.last_submit_date =  new Date();

        Object.assign(user, userParam);
        await user.save();

        return {"message": "Corrent"};
    }
    else {
        return {"message": "Wrong"};
    };
}

async function leaderboard() {
    return await Quiz.find({},{ user_id: 0, _id: 0 }).sort({"score":-1,"last_submit_date":1})
}

async function skipQuestion(quizParam) {
        // finding on which question the user is
        const user = await Quiz.findOne({ user_id: quizParam.id });

        // getting the question
        const question = await Question.findOne({ questionIndex: user.current_question });

        //Checking if question is skippable
        if(question.checkSkippable()){
            //Updating to next Question
            var userParam = user;
            userParam.current_question = user.current_question + 1;
            //userParam.last_submit_date = Date.now;
    
            Object.assign(user, userParam);
            await user.save();
    
            return {"message": "Question Skipped."};
        }
        else {
            return {"message": "Question can't be Skipped."};
        };
}

module.exports ={
    getQuestion,
    checkAnswer,
    leaderboard,
    skipQuestion
}