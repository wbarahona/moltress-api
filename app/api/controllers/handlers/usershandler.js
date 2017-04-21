/* jshint esversion: 6 */

import joi from 'joi';
import UsersService from '../../model/services/user';

const UsersHandler = {};

(() => {


    UsersHandler.getuserbyid = (request, reply) => {
        const { params } = request;
        const { id } = params;

        UsersService.getuser(id).then((res) => {
            const { code, message, content } = res;

            reply({
                statusCode: 200,
                code: code,
                message: message,
                content: content
            }).code(200);
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

    UsersHandler.saveuser = (request, reply) => {
        const { payload } = request;
        const { active, age, code, email, fname, hash, lname, password, scope, uid } = payload;
        const userinfo = payload;
        const role = {
            accesses: {
                categories: true,
                items: true,
                lists: true,
                order: true
            }
        };

        userinfo.role = role;

        UsersService.saveuser(userinfo).then((resp) => {
            if (resp.code === 1) {
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
            }
        });
    };

    UsersHandler.edituser = (request, reply) => {
        const { params, payload } = request;
        const { active, age, code, email, fname, hash, lname, password, scope, uid } = payload;
        const { id } = params;
        const userinfo = payload;
        const role = {
            accesses: {
                categories: true,
                items: true,
                lists: true,
                order: true
            }
        };

        userinfo.role = role;

        UsersService.edituser(id, userinfo).then((resp) => {
            if (resp.code === 1) {
                reply({
                    statusCode: 200,
                    code: 1,
                    message: 'User was updated correctly!',
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
            }
        });
    };

    UsersHandler.deleteuser = (request, reply) => {
        const { params } = request;
        const { id } = params;

        UsersService.deleteuser(id).then((resp) => {
            const { code, message, content } = resp;
            const statusCode = (code === 0) ? 500 : 200;

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
