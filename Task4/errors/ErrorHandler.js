class ErrorHandler extends Error {
    constructor(ststus, message, customCode) {
        super(message);
        this.message = message;
        this.status = ststus;
        this.code = customCode;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ErrorHandler;
