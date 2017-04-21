/* jshint esversion: 6 */

import handlers from './handlers';
import joi from 'joi';

const ThisModule = {};
const { auth } = handlers;

ThisModule.login = {
    method: 'POST',
    path: '/api/v1/login/',
    config: {
        handler: auth.login,
        description: 'Login method to application',
        notes: 'Logs in a user to the application by saving a cookie',
        tags: ['api', 'login', 'user'],
        validate: {
            payload: {
                email: joi.string()
                          .email()
                          .required()
                          .description('User\'s email')
                          .example('nathanexplosion@dethklok.com'),
                password: joi.string()
                             .min(2)
                             .max(200)
                             .required()
                             .description('User\'s password to login')
                             .example('**********')
            }
        },
        response: {
            schema: auth.schema.auth
        },
        auth: false
    }
};

ThisModule.logout = {
    method: 'POST',
    path: '/api/v1/logout/',
    config: {
        handler: auth.logout,
        description: 'Logout method from application',
        notes: 'Logs out a user from the application',
        tags: ['api', 'logout', 'user'],
        response: {
            schema: auth.schema.auth
        },
        auth: false
    }
};

export default ThisModule;
