/* jshint esversion: 6 */

import handlers from './handlers';
import joi from 'joi';

let RoutesModule = null;

(() => {

    const { items, users, auth } = handlers;

    // TODO: have each route object to each handler as object in the end
    // then push the objects into the RoutesModule
    RoutesModule = () => [
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
                auth: {
                    strategy: 'base',
                    scope: 'user' // or [‘user’,’admin’]
                }
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
        },
        {
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
                    schema: users.schema.auth
                },
                auth: false
            }
        },
        {
            method: 'POST',
            path: '/api/v1/logout/',
            config: {
                handler: auth.logout,
                description: 'Logout method from application',
                notes: 'Logs out a user from the application',
                tags: ['api', 'logout', 'user'],
                response: {
                    schema: users.schema.auth
                },
                auth: false
            }
        }
    ];
})();

export default RoutesModule;
