const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const { responseCodesEnum, constant: { SYSTEM_EMAIL, SYSTEM_EMAIL_PASSWORD } } = require('../constants');
const templateInfo = require('../email-templates');
const { ErrorHandler, errorMessages: { WRONG_TEMPLATE } } = require('../errors');

const templateParser = new EmailTemplates({
    view: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: SYSTEM_EMAIL,
        pass: SYSTEM_EMAIL_PASSWORD
    }
});

const sendMail = async (userMail, actions, context) => {
    const templateToSend = templateInfo[actions];

    if (!templateToSend) {
        throw new ErrorHandler(responseCodesEnum.BAD_REQUEST, WRONG_TEMPLATE.massage, WRONG_TEMPLATE.code);
    }

    const html = await templateParser.render(templateInfo.templateName, context);

    return transporter.sendMail({
        from: 'No reply',
        to: userMail,
        subject: templateInfo.subject,
        html
    });
};

module.exports = {
    sendMail
};
