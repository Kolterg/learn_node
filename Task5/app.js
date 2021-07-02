const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const ErrorHandler = require('./errors/ErrorHandler');

const { UserModel } = require('./dataBase');
const { passwordHasher } = require('./helpers');
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

app.use('/auth', async (req, res) => {
    const { password, email } = req.body;

    const userByEmail = await UserModel.findOne({ email }).select('+password');

    if (!userByEmail) {
        throw new ErrorHandler(responseCodesEnum.FORBIDDEN, errorMessages.WRONG_EMAIL_OR_PASSWORD);
    }

    await passwordHasher.compare(userByEmail.password, password);

    res.json('Ok');
});
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

// Задача зовсім не важка.
// Вам неоюхідно покрити всі місця, де це необхідно валідаторами JOI.
// Зробити заготовку для флоу аутернтифікації. Тобто роут, контроллер, мідлвари і так далі
