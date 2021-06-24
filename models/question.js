const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    questionIndex: { type: Number, unique: true, required: true },
    textQuestion: { 
        question: { type: String, required: true },
        description: { type: String, required: true },
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
        return {
            "question": this.textQuestion.question,
            "description": this.textQuestion.description
        };
    },

    checkAnswer: function(ques_type) {
        return this.textQuestion.answer;
    }
}

module.exports = mongoose.model('Question', questionSchema);