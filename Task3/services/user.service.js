const fs = require('fs');
const path = require('path');
const util = require('util');

const pathUsersDb = path.join('dataBase', 'users.json');
const writeFilePromise = util.promisify(fs.writeFile);
const readFilePromise = util.promisify(fs.readFile);

const getUsers = async () => {
    const users = await readFilePromise(pathUsersDb, 'utf-8');
    return JSON.parse(users);
};

module.exports = {
    findAll: async () => {
        const users = await getUsers();
        return users;
    },

    insertUser: async (userObject) => {
        const users = await getUsers();

        users.push(userObject);
        await writeFilePromise(pathUsersDb, JSON.stringify(users));
    },

    findOneById: async (userId) => {
        const users = await getUsers();

        return users[userId];
    },

    deleteUserById: async (userId) => {
        const users = await getUsers();

        users.splice(userId, 1);
        await writeFilePromise(pathUsersDb, JSON.stringify(users));
    },

    updateUserById: async (userId, user) => {
        const users = await getUsers();

        users[userId] = user;
        await writeFilePromise(pathUsersDb, JSON.stringify(users));
    }
};
