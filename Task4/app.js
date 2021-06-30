const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const { userRouter } = require('./routes');

const app = express();

const staticPath = path.join(__dirname, 'static');

function _mongooseConnection() {
    mongoose.connect('mongodb://localhost:27017/tasks', { useNewUrlParser: true, useUnifiedTopology: true });
}

// eslint-disable-next-line no-unused-vars
function _handleError(err, req, res, next) {
    res
        .status(err.status)
        .json({
            message: err || 'Unknown error',
            customCode: err.code || 0
        });
}

function _notFoundHandleError(err, req, res, next) {
    next({
        status: 404,
        message: 'Rout not found'
    });
}

_mongooseConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(staticPath));

app.use('/users', userRouter);
app.use('*', _notFoundHandleError);
app.use(_handleError);

app.listen(3000, () => {
    console.log('App listen 3000');
});
