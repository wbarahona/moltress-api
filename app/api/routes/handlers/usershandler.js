/* jshint esversion: 6 */

import joi from 'joi';

const UsersHandler = {};

(() => {


    UsersHandler.getUserById = (request, reply) => {
        const { params } = request;
        const { id } = params;

        reply({
            statusCode: 200,
            code: 1,
            message: `users api requested by id: ${ id }`,
            content: {}
        }).code(200);
    };

    UsersHandler.saveUser = (request, reply) => {
        const { payload } = request;
        const { active, age, code, email, fname, hash, lname, password, scope, uid } = payload;
        const role = {
            accesses: {
                categories: true,
                items: true,
                lists: true,
                order: true
            }
        };

        reply({
            statusCode: 200,
            code: 1,
            message: 'User was saved correctly!',
            content: {
                active: active,
                age: age,
                code: code,
                email: email,
                fname: fname,
                hash: hash,
                lname: lname,
                password: password,
                role: role,
                scope: scope,
                uid: uid
            }
        }).code(200);
    };

    //
    // Schemas definition for Users
    // -----------------------------------------------------------------
    UsersHandler.schema = {};
    UsersHandler.schema.user = joi.object().keys({
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
                    .description('This is the response content, this holds an object with the item properties')
                    .example({name: 'Item1'})
    });
})();

export default UsersHandler;
