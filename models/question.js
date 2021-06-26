const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    questionIndex: { type: Number, unique: true, required: true },
    questionType: {type: String, required: true},
    questionData: { 
        question: { type: String, required: true },
        description: { type: String },
        options:{
            a: { type: String },
            b: { type: String },
            c: { type: String },
            d: { type: String }
         },
        answer: { type: String, required: true }
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
        if(ques_type=="text"){
            return {
                    "questionType": this.questionType,
                    "question": this.questionData.question,
                    "description": this.questionData.description,
                };
        }

        if(ques_type=="mcq"){
            return {
                    "questionType": this.questionType,
                    "question": this.questionData.question,
                    "description": this.questionData.description,
                    "options": this.questionData.options
                };
        }
    },

    checkAnswer: function() {
        return this.questionData.answer;
    }
    
}

module.exports = mongoose.model('Question', questionSchema);