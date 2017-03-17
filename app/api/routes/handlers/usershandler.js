'use strict';

const UsersHandler = {};

UsersHandler.getUserById = (request, reply) => {
    const { params } = request;

    reply({
        statusCode: 200,
        code: 1,
        message: `users api requested by id: ${ params.id }`,
        content: {}
    }).code(200);
};

export default UsersHandler;
