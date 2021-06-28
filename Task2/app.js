// Вам потрібно реалізувати мінімум 3 строрінки.
// 1) Реєстрація
// 2) Логінація.
// 3) Список всіх юзерів.
//
// Створити файлик з юзерами, який буде виступати в ролі бази данних.
//
// При реєстрації юзер вводин логін та пороль і ви його данні дописуєте у файлик.
// Якщо такий мейл вже є, то видаємо помилку.
//
// При логінації юзер так само ввоить мейл та пароль і вам необхідно знайти юзера в файлі.
// Якщо такий мейлик з таким паролем є, то привіти юзера на платформі показати інформацію про нього та кнопочку,
// яка перекине нас на список всіх юзерів.
// В інакшому випадку сказати, що необхідно реєструватись.
//
// І відображення всіх юзерів це відповідно просто виведення списку вісх юзерів.
//
// При реєстрації мейли не можуть повторюватись

const fs = require('fs');
const path = require('path');
const express = require('express');
const expressHbs = require('express-handlebars');
const util = require('util');

const app = express();

const staticPath = path.join(__dirname, 'static');
const pathUsersList = path.join(__dirname, 'users-list.json');
const writeFilePromise = util.promisify(fs.writeFile);
const readFilePromise = util.promisify(fs.readFile);

let isAdult = false;

app.use(express.static(staticPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({
    defaultLayout: false
}));
app.set('views', staticPath);

//------------------

const getUsers = async () => {
    const users = await readFilePromise(pathUsersList, 'utf-8');
    return JSON.parse(users);
};

app.get('/', (req, res) => {
    res.render('home', { isAdult });
});

app.get('/reg', (req, res) => {
    res.render('registration');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/user', (req, res) => {
    res.render('user', { isAdult });
});

app.get('/users', async (req, res) => {
    const users = await getUsers();

    res.render('users', { users });
});

//-----------------------------

app.post('/reg', async (req, res) => {
    const user = req.body;
    const users = await getUsers();

    const userExist = users.find((value) => value.login === user.login);
    if (userExist) {
        const err = 'Login is already busy!';
        res.render('error', { err });
        return;
    }

    users.push(user);
    await writeFilePromise(pathUsersList, JSON.stringify(users));

    res.render('home');
});

app.post('/login', async (req, res) => {
    const user = req.body;
    const users = await getUsers();

    const userExist = users.find((value) => value.login === user.login);
    if (!userExist) {
        const err = 'Uncorrected login or password';
        res.render('error', { err });
        return;
    }

    isAdult = true;

    res.render('home');
});

app.listen(3000, () => {
    console.log('App listen 3000');
});
