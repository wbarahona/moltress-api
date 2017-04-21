/* jshint esversion: 6 */

import handlers from './handlers';
import joi from 'joi';

const ThisModule = {};
const { items } = handlers;


ThisModule.getitems = {
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
        auth: {
            strategy: 'session',
            scope: 'user' // or [‘user’,’admin’]
        }
    }
};

ThisModule.getitembyname = {
    method: 'GET',
    path: '/api/v1/item/{name}',
    config: {
        handler: items.getitembyname,
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
            strategy: 'session',
            scope: 'user' // or [‘user’,’admin’]
        }
    }
};

export default ThisModule;
