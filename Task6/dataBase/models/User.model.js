const { Schema, model } = require('mongoose');

const { databaseTablesEnum, userRolesEnum } = require('../../constants');

const userSchema = new Schema({
    login: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
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

module.exports = model(databaseTablesEnum.USER, userSchema);
