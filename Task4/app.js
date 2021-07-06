const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const { userRouter } = require('./routes');
const { errorFunc } = require('./helpers');
const { constant } = require('./constants');

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
app.use('*', errorFunc._notFoundError);
app.use(errorFunc._unknownError);

app.listen(constant.PORT, () => {
    console.log(`App listen ${constant.PORT}`);
});
