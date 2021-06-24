const express = require('express');
const bodyParser = require('body-parser');
const db = require('./util/database');
const errorHandler = require('./util/error-handler');

const app = express();
const port = process.env.PORT || 80;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

const userRoutes = require('./routes/user');
const questionRoutes = require('./routes/question');
const quizRoutes = require('./routes/quiz');

//Handling User Authentication
app.use('/user', userRoutes);
app.use('/question', questionRoutes);
app.use('/quiz', quizRoutes);

//Handling Errors
app.use(errorHandler);

//Server Running
app.listen(port);
console.log("Server listening on port "+ port);