/* jshint esversion: 6 */

import handlers from '../handlers';
import joi from 'joi';

const ThisModule = {};
const { authentichandler } = handlers;

ThisModule.login = {
    handler: authentichandler.login,
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
        schema: authentichandler.schema.authentichandler
    },
    auth: false
};

ThisModule.logout = {
    handler: authentichandler.logout,
    description: 'Logout method from application',
    notes: 'Logs out a user from the application',
    tags: ['api', 'logout', 'user'],
    response: {
        schema: authentichandler.schema.authentichandler
    },
    auth: false
};

ThisModule.passwordrecovery = {
    handler: authentichandler.passwordrecovery,
    description: 'Password reset method for users',
    notes: 'Allows the user to reset his password, generates a temporal hash and emails it',
    tags: ['api', 'password', 'reset', 'user'],
    validate: {
        payload: {
            email: joi.string()
                      .email()
                      .required()
                      .description('User\'s email')
                      .example('nathanexplosion@dethklok.com')
        }
    },
    response: {
        schema: authentichandler.schema.authentichandler
    },
    auth: false
};

export default ThisModule;
