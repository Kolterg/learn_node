const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const { constant } = require('./constants');
const { errorFunctions } = require('./helpers');
const { userRouter, authRouter } = require('./routes');

const app = express();

const staticPath = path.join(__dirname, 'static');

function _mongooseConnection() {
    mongoose.connect('mongodb://localhost:27017/tasks', { useNewUrlParser: true, useUnifiedTopology: true });
}

_mongooseConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(staticPath));

app.use('/auth', authRouter);
app.use('/users', userRouter);
// eslint-disable-next-line no-use-before-define
app.use('*', errorFunctions._notFoundError);
// eslint-disable-next-line no-use-before-define
app.use(errorFunctions._unknownError);

app.listen(constant.PORT, () => {
    console.log(`App listen ${constant.PORT}`);
});

// 1. '10m'  '30d'  'access'  в константи +
//
// 2. немає флоу на рефреш
//
// 3. checkUserRoles :
// Error  ->  ErrorHandler
// 'Permission denied!' в константи +
