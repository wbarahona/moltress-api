import handlers from '../handlers';
import joi from 'joi';

const ThisModule = {};
const { authentichandler } = handlers;

ThisModule.checkfirebaseauthtoken = {
    handler: authentichandler.checkfirebaseauthtoken,
    description: 'Check firebase token provided by user request',
    notes: 'Allows the user to keep the session if firebase has returned the proper response for the token',
    tags: ['api', 'token', 'check', 'firebase'],
    validate: {
        payload: {
            idtoken: joi.string()
                .min(2)
                .required()
                .description('User\'s token to check')
                .example('ABCDEFGHIJKLMNOPQRSTUVWXYZ123_@#')
        }
    },
    response: {
        schema: authentichandler.schema.authentichandler
    },
    auth: false
};

export default ThisModule;
