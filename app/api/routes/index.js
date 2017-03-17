'use strict';

import handlers from './handlers';
import joi from 'joi';

const { items, users } = handlers;

const routes = (server) => [
    {
        method: 'GET',
        path: '/api/v1/items/',
        config: {
            handler: items.all,
            description: 'Gets all items from database',
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
            }
        }
    },
    {
        method: 'GET',
        path: '/api/v1/item/{name}',
        config: {
            handler: items.getItemByName,
            description: 'Gets the item by name',
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
            }
        }
    },
    {
        method: 'get',
        path: '/api/v1/user/{id}',
        config: {
            handler: users.getUserById,
            description: 'Gets the item by id',
            validate: {
                params: {
                    id: joi.string()
                             .required()
                             .description('User id to search for')
                             .example('ABC1234567890')
                }
            }
        }
    }
];

export default routes;
