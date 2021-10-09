const express = require('express');
const bodyParser = require('body-parser');
const db = require('./util/database');
const errorHandler = require('./util/error-handler');
const jwt = require('./util/jwt');
var cors = require('cors')
const path = require('path');
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const app = express();
app.use(helmet())
const port = process.env.PORT || 80;

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.json({limit: '10kb'}));
app.use(mongoSanitize());

//Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(jwt());

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