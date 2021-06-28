// 1. Лінтер + конфіг
// 2. Без фронта, тільк postman
// 3. Структура
// 4. Методи:
//            1. Crate user.
//            2. Read all users.
//            3. Read one user.
//            4. Update user.
//            5. Delete user.

const path = require('path');
const express = require('express');

const { userRouter } = require('./routes');

const app = express();

const staticPath = path.join(__dirname, 'static');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(staticPath));

app.use('/users', userRouter);

app.listen(3000, () => {
    console.log('App listen 3000');
});
