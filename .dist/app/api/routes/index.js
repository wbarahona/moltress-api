'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _handlers = require('./handlers');

var _handlers2 = _interopRequireDefault(_handlers);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const items = _handlers2.default.items,
      users = _handlers2.default.users;


const routes = server => [{
    method: 'GET',
    path: '/api/v1/items/',
    config: {
        handler: items.all,
        description: 'Gets all items from database',
        validate: {
            query: {
                limit: _joi2.default.number().integer().default(20).min(0).description('Limit of items to be displayed').example(20)
            }
        },
        response: {
            schema: items.schema.items
        }
    }
}, {
    method: 'GET',
    path: '/api/v1/item/{id}',
    config: {
        handler: items.getItemById,
        description: 'Gets the item by id',
        validate: {
            params: {
                name: _joi2.default.string().required().description('Item id to search for').example('ABC1234567890')
            }
        }
    }
}, {
    method: 'GET',
    path: '/api/v1/user/{id}',
    config: {
        handler: users.getUserById,
        description: 'Gets the item by id',
        validate: {
            params: {
                name: _joi2.default.string().required().description('User id to search for').example('ABC1234567890')
            }
        }
    }
}];

exports.default = routes;