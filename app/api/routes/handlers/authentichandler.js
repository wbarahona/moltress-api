/* jshint esversion: 6 */

import joi from 'joi';
import AuthService from '../../model/services/auth';

const AuthHandler = {};

(() => {


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
            reply({
                statusCode: 500,
                code: 0,
                message: 'There was an error on the request for user and password.',
                content: err
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
        content: joi.array()
                    .required()
                    .items(joi.object())
                    .description('This is the response content, this holds the array of items')
                    .example([{name: 'Item1'}, {name: 'Item2'}])
    }).label('auth');

})();

export default AuthHandler;
