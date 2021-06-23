// - у вас є масив юзрів (до 10), з такими полями наприклад - const users = [
//     { name: 'olya', gender: 'female', age: 20 }
//         ...
// ], вам потрібно написати метод який створює файлики - де назва файлику - це імя вашого юзера (наприклад - Olya.txt),
// вміст це сам ваш юзер - { name: 'olya', gender: 'female', age: 20 }
// перед тим створити 4 папки - наприклад - manOlder20, manYounger20, womanOlder20, womanYounger20
// і розподілити ваших юзерів саме по відповідних папках

let users = [
    {name: 'Andriy', gender: 'male', age: 19},
    {name: 'Yana', gender: 'female', age: 21},
    {name: 'Oleksiy', gender: 'male', age: 34},
    {name: 'Karina', gender: 'female', age: 15},
    {name: 'Serhiy', gender: 'male', age: 47},
    {name: 'Miriam', gender: 'female', age: 37},
    {name: 'Maks', gender: 'male', age: 13},
    {name: 'Tanya', gender: 'female', age: 25},
    {name: 'Igor', gender: 'male', age: 14},
    {name: 'Masha', gender: 'female', age: 17},
];

const fs = require('fs');
const path = require('path');

for (const user of users) {

    const filePath = path.join(__dirname, 'all', `${user.name}.txt`);

    let u = JSON.stringify(user);
    console.log(u);

    fs.writeFile(filePath, `${u}`, (err) => {
        if (err) {
            console.log(err);
        }
    });

    // if (user.gender === 'male') {
    //     if (user.age < 20) {
    //         const filePath = __dirname + `/manOlder20/${user.name}.txt`;
    //
    //         fs.writeFile(filePath, user, (err) => {
    //             console.log(err);
    //         });
    //     } else {
    //         const filePath = __dirname + `/manYounger20/${user.name}.txt`;
    //
    //         fs.writeFile(filePath, user, (err) => {
    //             console.log(err);
    //         });
    //     }
    // } else {
    //     if (user.age < 20) {
    //         const filePath = __dirname + `/manOlder20/${user.name}.txt`;
    //
    //         fs.writeFile(filePath, user, (err) => {
    //             console.log(err);
    //         });
    //     } else {
    //         const filePath = __dirname + `/manYounger20/${user.name}.txt`;
    //
    //         fs.writeFile(filePath, user, (err) => {
    //             console.log(err);
    //         });
    //     }
    // }
}