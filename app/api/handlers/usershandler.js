import joi from 'joi';
import UsersService from '../model/services/user';

const UsersHandler = {};
let statusCode = 500;
let code = 0;
let message = '';
let content = {};

UsersHandler.getuserbyid = async (request, h) => {
    const { params } = request;
    const { id } = params;

    try {
        const usersResponse = await UsersService.getuser(id);

        statusCode = (usersResponse.code === 1) ? 200 : 500;
        code = usersResponse.code;
        message = usersResponse.message;
        content = usersResponse.content;
    } catch(err) {
        message = 'Users Handler "getuserbyid" operation was unsuccessful';
        content = err;
    }

    return h.response({
        statusCode,
        code,
        message,
        content
    }).code(statusCode);
};

UsersHandler.saveuser = async (request, h) => {
    const { payload } = request;
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

    try {
        const usersResponse = await UsersService.saveuser(userinfo);

        statusCode = (usersResponse.code === 1) ? 200 : 500;
        code = usersResponse.code;
        message = usersResponse.message;
        content = usersResponse.content;
    } catch(err) {
        message = 'Users handler "saveuser" operation failed';
        content = err;
    }

    return h.response({
        statusCode,
        code,
        message,
        content
    }).code(statusCode);
};

UsersHandler.edituser = async (request, h) => {
    const { params, payload } = request;
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

    try {
        const usersResponse = await UsersService.edituser(id, userinfo);

        statusCode = (usersResponse === 1) ? 200 : 500;
        code = usersResponse.code;
        message = usersResponse.message;
        content = usersResponse.content;
    } catch(err) {
        message = 'Users handler "edituser" operation was unsuccessful';
        content = err;
    }

    return h.response({
        statusCode,
        code,
        message,
        content
    }).code(statusCode);
};

UsersHandler.deleteuser = async (request, h) => {
    const { params } = request;
    const { id } = params;

    try {
        const usersResponse = await UsersService.deleteuser(id);

        statusCode = (usersResponse.code === 1) ? 200 : 500;
        code = usersResponse.code;
        message = usersResponse.message;
        content = usersResponse.content;
    } catch(err) {
        message = 'Users handler "deleteuser" operation was unsuccessful';
    }

    return h.response({
        statusCode,
        code,
        message,
        content
    }).code(statusCode);
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

export default UsersHandler;
