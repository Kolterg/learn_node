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

const app = express();

const staticPath = path.join(__dirname, 'static');
const pathUsersList = path.join(__dirname, 'users-list.json');

app.use(express.static(staticPath));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine', '.hbs');
app.set('views', staticPath);
app.engine('.hbs', expressHbs({
    defaultLayout: false
}));

//------------------

app.get('/reg', (req, res) => {
    res.render('registration');
});

app.get('/login', (req, res) => {
    res.render('login', {isAdult: true});
});

app.get('/users', (req, res) => {
    res.render('users');
});

//-----------------------------


app.post('/users', (req, res) => {
    console.log(req.body);
    const user = JSON.stringify(req.body);

    fs.appendFile(pathUsersList, user, err => {
        if (err) {
            console.log(err);
        }
    });

    res.json('Registration work');
});

app.post('/login', (req, res) => {
    console.log(req.body);
    res.json('Login work');
});

const users = require('./users-list.json')

console.log(users);

app.listen(3000, () => {
    console.log('App listen 3000');
});