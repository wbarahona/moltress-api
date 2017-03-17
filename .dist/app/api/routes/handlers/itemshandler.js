'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ItemsHandler = {};

ItemsHandler.all = (request, reply) => {
    const params = request.params,
          query = request.query;
    const limit = query.limit;


    reply({
        statusCode: 200,
        code: 0,
        message: `items api requested all items, limited by ${limit} results`,
        content: []
    }).code(200);
};

ItemsHandler.getItemById = (request, reply) => {
    const params = request.params;


    reply({
        statusCode: 200,
        code: 0,
        message: `items api requested by id: ${params.id}`,
        content: []
    }).code(200);
};

ItemsHandler.schema = {};
ItemsHandler.schema.items = _joi2.default.object().keys({
    statusCode: _joi2.default.number().required().integer().description('This is the response code').example(200),
    code: _joi2.default.number().required().integer().description('This is the response code from the service').example(0),
    message: _joi2.default.string().required().description('This is the response message from the service, it shall be passed to the reply').example('This request was successful'),
    content: _joi2.default.array().required().items(_joi2.default.object()).description('This is the response content, this holds the array of items').example([{ name: 'Item1' }, { name: 'Item2' }])
}).label('items');

exports.default = ItemsHandler;