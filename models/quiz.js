const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    user_id: { type: String, unique: true, required: true },
    user_name: { type: String, unique: true, required: true },
    current_question: { type: Number, default: 1 },
    last_submit_date: { type: Date, default: Date.now },
    score:{type: Number, default: 0}
});

quizSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Quiz', quizSchema);