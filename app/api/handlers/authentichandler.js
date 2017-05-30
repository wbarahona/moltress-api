/* jshint esversion: 6 */

import joi from 'joi';
import AuthService from '../model/services/auth';

const AuthHandler = {};

AuthHandler.login = (request, reply) => {
    const { payload } = request;
    const { email, password } = payload;
    const { loginemail } = AuthService;

    loginemail(email, password).then((resp) => {
        const { code, message, content } = resp;
        const { uid, scope } = content;
        let statusCode = 500;

        if (code !== 1) {
            statusCode = 401;
        } else {
            request.cookieAuth.set({id: uid, scope: scope});
            statusCode = 200;
        }
        reply({
            statusCode: statusCode,
            code: code,
            message: message,
            content: content
        }).code(statusCode);
    }, (err) => {
        const { code, message, content } = err;

        reply({
            statusCode: 500,
            code: code,
            message: message,
            content: content
        }).code(500);
    });
};

AuthHandler.logout = (request, reply) => {
    request.cookieAuth.clear();

    reply({
        statusCode: 200,
        code: 1,
        message: 'Successfully logged out.',
        content: {}
    });
};

AuthHandler.passwordrecovery = (request, reply) => {
    const { payload } = request;
    const { email } = payload;
    const { passwordreset } = AuthService;

    passwordreset(email).then((resp) => {
        const { code, message, content } = resp;

        reply({
            statusCode: 200,
            code: code,
            message: message,
            content: content
        });
    }, (err) => {
        const { code, message, content } = err;

        reply({
            statusCode: 500,
            code: code,
            message: message,
            content: content
        });
    });
};

//
// Schemas definition for Auth
// -----------------------------------------------------------------
AuthHandler.schema = {};

AuthHandler.schema.auth = joi.object().keys({
    statusCode: joi.number()
                   .required()
                   .integer()
                   .description('This is the response code')
                   .example(200),
    code: joi.number()
             .required()
             .integer()
             .description('This is the response code from the service')
             .example(0),
    message: joi.string()
                .required()
                .description('This is the response message from the service, it shall be passed to the reply')
                .example('This request was successful'),
    content: joi.object()
                .required()
                .description('This is the response content if needed this contains some useful resource')
                .example({name: 'Item1'})
}).label('auth');

export default AuthHandler;
