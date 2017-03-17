'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
const UsersHandler = {};

UsersHandler.getUserById = (request, reply) => {
    const params = request.params;


    reply({
        statusCode: 200,
        message: 'users api requested by id: ' + params.id,
        data: {}
    }).code(200);
};

exports.default = UsersHandler;