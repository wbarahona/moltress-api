/*jshint esversion: 6 */

import joi from 'joi';
import AuthService from '../../model/services/auth';

const AuthHandler = {};

(() => {
'use strict';

    AuthHandler.checktoken = (request, reply) => {
        const { payload } = request;
        const { token } = payload;

        // AuthService.checktoken(token);

        reply({
            statusCode: 200,
            code: 1,
            message: `checked token ${ token } Successfully.`,
            content: {sessionData: 'aja'}
        }).code(200);
    };

    AuthHandler.createtoken = (request, reply) => {
        const { params } = request;
        const { uid } = params;

        // AuthService.createtoken(uid).then((response) => {
        //     const { code, message, content } = response;

            reply({
                statusCode: 200,
                code: 1,
                message: 'message',
                content: {}
            }).code(200);
        // },(error) => {
        //     const { code, message, content } = error;
        //
        //     reply({
        //         statusCode: 400,
        //         code: code,
        //         message: message,
        //         content: content
        //     }).code(400);
        // });

    };

    //
    // Schemas definition for Auth
    // -----------------------------------------------------------------
    AuthHandler.schema = {};
    AuthHandler.schema.auth = joi.object().keys({
                                    statusCode:  joi.number()
                                                    .required()
                                                    .integer()
                                                    .description('This is the response code')
                                                    .example(200),
                                     code:       joi.number()
                                                    .required()
                                                    .integer()
                                                    .description('This is the response code from the service')
                                                    .example(0),
                                     message:    joi.string()
                                                    .required()
                                                    .description('This is the response message from the service, it shall be passed to the reply')
                                                    .example('This request was successful'),
                                     content:    joi.object()
                                                    .required()
                                                    .description('This is the response content, this holds an object with the item properties')
                                                    .example({name: 'Item1'})
                        }).label('item');

})();

export default AuthHandler;
