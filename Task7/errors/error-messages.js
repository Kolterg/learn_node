module.exports = {
    UNKNOWN_ERROR: {
        message: 'Unknown error',
        code: 0
    },
    NOT_ADMIN: {
        message: 'Not admin!',
        code: '400.1',
    },
    NO_TOKEN: {
        message: 'No Token!',
        code: '401.1',
    },
    WRONG_EMAIL_OR_PASSWORD: {
        message: 'Wrong Email or Password!',
        code: '403.1'
    },
    WRONG_DATA: {
        message: 'Uncorrected data!',
        code: '403.2'
    },
    ROUE_NOT_FOUND: {
        message: 'Rout not found',
        code: '404.1',
    },
    RECORD_NOT_FOUND: {
        message: 'Record not found',
        code: '404.2'
    },
    USER_NOT_FOUND: {
        message: 'User not found!',
        code: '404.3',
    },
    EMAIL_ALREADY_EXIST: {
        message: 'Email is already exist!',
        code: '409.1'
    },
    LOGIN_IS_BUSY: {
        message: 'Login is already busy!',
        code: '409.2',
    },
};
