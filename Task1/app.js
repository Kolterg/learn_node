//Посортувати юзерів по папках.
// У вас є дві папки. 1800 та 2000. В кожній з цих папок є файлики аля Karina.txt в якому міститься {"gender": "female"}
// Oleg.txt в якому міститься {"gender": "male"}
// 1) Студентів з 1800 перевести в групу на 2000. І навпаки
// 2) Перемістити всіх дівчат в папку girls а хлопців в папаку boys.
//
// * вам потрбіно перемісти всі файлики з вкладених папок в іншу папку. Зробити всі файли на одному рівні вкладеності.
// (Більше інформації в записі лекції)

const fs = require('fs');
const path = require('path')

const path1800 = path.join(__dirname, '1800');
const path2000 = path.join(__dirname, '2000');

fs.readdir(path1800, (err, files) => {
    if (err) {
        console.log(err);
        return;
    }

    files.forEach(file => {
        list1800.push(file);

        fs.rename(path1800 + '/' + file, path2000 + '/' + file, (err1) => {
            if (err1) {
                console.log(err1);
            }
        });

    }, 100);
});

fs.readdir(path2000, (err, files) => {
    if (err) {
        console.log(err);
        return;
    }

    files.forEach(file => {
        fs.rename(path2000 + '/' + file, path1800 + '/' + file, (err1) => {
            if (err1) {
                console.log(err1);
            }
        });
    });
});

// Не працюэ!
// fs.readdir(path1800, (err, files) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//
//     files.forEach(file => {
//         temporaryPath = path.join(path1800, file)
//         const human = require(temporaryPath);
//         console.log(human);
//
//     });
// });