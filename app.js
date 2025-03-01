require('dotenv').config({path: `${process.cwd()}/.env`}); //process.cwd() returns the value of directory where we run the node process
const express = require('express');
var cors = require('cors');
const authRouter = require('./route/authRoute');
const catchAsync = require('./utils/catchAsync');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');

const app = express();

app.use(cors());

app.use(express.json());

//all routes will be here

app.use('/api/v1/auth', authRouter);

app.use('*',
    catchAsync( async (req, res, next) => {
        throw new AppError(`Can't find ${req.originalUrl} on this server.`, 404);
    })
);

app.use(globalErrorHandler);

console.log('env port', process.env.PORT);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log('Server up and running', PORT);
});

//node .\app.js
