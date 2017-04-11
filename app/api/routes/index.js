/*jshint esversion: 6 */

import handlers from './handlers';
import joi from 'joi';

let RoutesModule = null;

(() => {
'use strict';
    const { items, users, auth } = handlers;

    // TODO: have each route object to each handler as object in the end
    // then push the objects into the RoutesModule
    RoutesModule = (server) => [
        {
            method: 'GET',
            path: '/api/v1/items/',
            config: {
                handler: items.all,
                description: 'Gets all items from database',
                notes: 'Gets all items from database does take limit on how many items are to be displayed',
                tags: ['api', 'all', 'items'],
                validate: {
                    query: {
                        limit: joi.number()
                                  .integer()
                                  .default(20)
                                  .min(0)
                                  .description('Limit of items to be displayed')
                                  .example(20)
                    }
                },
                response: {
                    schema: items.schema.items
                },
                auth: false
            }
        },
        {
            method: 'GET',
            path: '/api/v1/item/{name}',
            config: {
                handler: items.getItemByName,
                description: 'Gets the item by name',
                notes: 'Gets the item by the name sent in the url',
                tags: ['api', 'item', 'name'],
                validate: {
                    params: {
                        name: joi.string()
                                 .required()
                                 .description('Item name to search for')
                                 .example('ABC1234567890')
                    }
                },
                response: {
                    schema: items.schema.item
                },
                auth: 'simple'
            }
        },
        {
            method: 'GET',
            path: '/api/v1/user/{id}',
            config: {
                handler: users.getUserById,
                description: 'Gets the user by id',
                notes: 'Gets the user information by the user id',
                tags: ['api', 'user', 'info', 'id'],
                validate: {
                    params: {
                        id: joi.string()
                               .required()
                               .description('User id to search for')
                               .example('ABC1234567890')
                    }
                },
                response: {
                    schema: users.schema.user
                },
                auth: false
            }
        },
        {
            method: 'POST',
            path: '/api/v1/checktoken/',
            config: {
                handler: auth.checktoken,
                description: 'Checks user token',
                notes: 'Check token from client app',
                tags: ['api', 'token', 'validation'],
                validate: {
                    payload: {
                        token: joi.string()
                                  .required()
                                  .description('User\'s token')
                                  .example('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
                    }
                },
                response: {
                    schema: auth.schema.auth
                },
                auth: false
            }
        },
        {
            method: 'POST',
            path: '/api/v1/createtoken/{uid}',
            config: {
                handler: auth.createtoken,
                description: 'Creates a custom token',
                notes: 'Creates a new token for the user',
                tags: ['api', 'create', 'token'],
                validate: {
                    params: {
                        uid: joi.string()
                                .required()
                                .description('User\'s uid')
                                .example('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
                    }
                },
                response: {
                    schema: auth.schema.auth
                },
                auth: false
            }
        },
        {
            method: 'POST',
            path: '/api/v1/user/',
            config: {
                handler: users.saveUser,
                description: 'Saves a new user',
                notes: 'Saves a new user into the database',
                tags: ['api', 'save', 'user'],
                validate: {
                    payload: {
                        fname: joi.string()
                                  .required()
                                  .description('User\'s first name')
                                  .example('Nathan'),
                        lname: joi.string()
                                  .required()
                                  .description('User\'s last name')
                                  .example('Explosion'),
                        dob: joi.date()
                                .timestamp()
                                .required()
                                .description('User\'s date of birth in javascript format')
                                .example('1489881121232'),
                        email: joi.string()
                                  .required()
                                  .email(),
                        username: joi.string()
                                     .required()
                                     .description('User\'s username to login')
                                     .example('nathanexplosion'),
                        password: joi.string()
                                     .required()
                                     .min(6)
                                     .max(25)
                                     .description('User\'s password to login')
                                     .example('**********'),
                        scope: joi.string()
                                  // .valid(authService.scopes)
                                  .description('User\'s scope')
                    }
                },
                response: {
                    schema: users.schema.user
                },
                auth: false
                // auth: {
                //     role: ['ADMIN']
                // }
            }
        }
    ];
})();

export default RoutesModule;
