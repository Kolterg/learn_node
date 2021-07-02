const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const { userRouter } = require('./routes');
const { responseCodesEnum, errorMessages } = require('./constants');

const app = express();

const staticPath = path.join(__dirname, 'static');

function _mongooseConnection() {
    mongoose.connect('mongodb://localhost:27017/tasks', { useNewUrlParser: true, useUnifiedTopology: true });
}

_mongooseConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(staticPath));

app.use('/users', userRouter);
// eslint-disable-next-line no-use-before-define
app.use('*', _notFoundHandleError);
// eslint-disable-next-line no-use-before-define
app.use(_handleError);

app.listen(3000, () => {
    console.log('App listen 3000');
});

// eslint-disable-next-line no-unused-vars
function _handleError(err, req, res, next) {
    res
        .status(err.status)
        .json({
            message: err || errorMessages.UNKNOWN_ERROR,
            customCode: err.code || 0
        });
}

function _notFoundHandleError(err, req, res, next) {
    next({
        status: responseCodesEnum.NOT_FOUND,
        message: errorMessages.ROUE_NOT_FOUND
    });
}
