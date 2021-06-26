const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    questionIndex: { type: Number, unique: true, required: true },
    questionType: {type: String, required: true},
    textQuestion: { 
        question: { type: String },
        description: { type: String },
        answer: { type: String }
    },
    mcqQuestion: { 
        question: { type: String },
        description: { type: String },
        options:{ type: Array },
        answer: { type: String }
    },
    createdDate: { type: Date, default: Date.now }
});

//To remove extra information
questionSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.createdDate;
    }
});

questionSchema.methods = {

    getQuestion: function(ques_type) {
        if(ques_type == "text"){
            return {
                "questionType": this.questionType,
                "question": this.textQuestion.question,
                "description": this.textQuestion.description
            };
        }

        if(ques_type == "mcq"){
            return {
                "questionType": this.questionType,
                "question": this.mcqQuestion.question,
                "description": this.mcqQuestion.description,
                "options": this.mcqQuestion.options
            };
        }
      
    },

    checkAnswer: function(ques_type) {
        if(ques_type == "text"){
            return this.textQuestion.answer;
        }

        if(ques_type == "mcq"){
            return this.mcqQuestion.answer;
        }
    }
    
}

module.exports = mongoose.model('Question', questionSchema);