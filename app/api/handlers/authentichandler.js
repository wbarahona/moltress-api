import joi from 'joi';
import AuthService from '../model/services/auth';

const AuthHandler = {};
let statusCode = 500;
let code = 0;
let message = '';
let content = {};

AuthHandler.checkfirebaseauthtoken = async (request, h) => {
    const { payload } = request;
    const { checkfirebaseauthtoken } = AuthService;

    try {
        const authResponse = await checkfirebaseauthtoken(payload);

        statusCode = (authResponse.code === 1) ? 200 : 500;

        code = authResponse.code;
        message = authResponse.message;
        content = authResponse.content;
    } catch(err) {
        code = 0;
        message = 'Auth Handler: "checkfirebaseauthtoken" operation was unsuccessful';
        content = err;
    }

    return h.response({
        statusCode,
        code,
        message,
        content
    }).code(statusCode);
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
