/* jshint esversion: 6 */

import joi from 'joi';
// import UserService from '../../model/services/user';

const AuthHandler = {};

(() => {


    AuthHandler.login = (request, reply) => {
        const { payload } = request;
        const { email, password } = payload;

        reply({
            statusCode: 200,
            code: 1,
            message: `well this request is good for ${ email } whose password was: ${ password }`,
            content: {}
        });

        // getValidatedUser(email, password)
        // .then((response) => {
        //     const { code, message, content } = response;
        //     const { user } = content;
        //
        //     if (code === 1) {
        //         request.auth.session.set(user);
        //         reply({
        //             statusCode: 200,
        //             code: 1,
        //             message: message,
        //             content: {}
        //         });
        //     } else {
        //         reply({
        //             statusCode: 400,
        //             code: 2,
        //             message: message,
        //             content: content
        //         }).code(400);
        //     }
        // })
        // .catch((err) => {
        //     reply({
        //         statusCode: 500,
        //         code: 0,
        //         message: 'Error on request!',
        //         content: err
        //     }).code(500);
        // });
    };

    AuthHandler.logout = (request, reply) => {
        request.auth.session.clear();

        reply({
            statusCode: 200,
            code: 1,
            message: 'Successfully logged out',
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
