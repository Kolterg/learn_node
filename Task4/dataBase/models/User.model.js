const { Schema, model } = require('mongoose');

const { databaeTablesEnum, userRolesEnum } = require('../../constants');

const userShama = new Schema({
    login: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        select: false
    },
    role: {
        type: String,
        enum: Object.values(userRolesEnum),
        default: userRolesEnum.USER
    }
}, { timestamps: true });

// userShama.virtual('fullName').get(function() {
//     return `${this.name}`;
// });

module.exports = model(databaeTablesEnum.USER, userShama);
