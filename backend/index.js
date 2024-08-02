var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');
var app = express();

const apiUrl = 'mongodb://localhost:27017/login_form';

const userRouter = require('../backend/router/users.router');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

mongoose.connect(apiUrl)
    .then(() => console.log('Kết nối thành công'))
    .catch((err) => console.log('Thất bại: ', err))

app.use('/users', userRouter);

app.use(function (req, res, next) {
    next(createError(404));
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});


module.exports = app;
