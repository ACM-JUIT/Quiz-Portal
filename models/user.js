const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

//To remove extra information
userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.password;
        delete ret.createdDate;
        delete ret.name;
        delete ret.email;
    }
});

module.exports = mongoose.model('User', userSchema);