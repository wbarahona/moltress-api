/* jshint esversion: 6 */

import joi from 'joi';

const ItemsHandler = {};

(() => {


    ItemsHandler.all = (request, reply) => {
        const { params, query } = request;
        const { limit } = query;

        reply({
            statusCode: 200,
            code: 1,
            message: `items api requested all items, limited by ${ limit } results, params obj was: ${ params }`,
            content: [{item: 'item1'}]
        }).code(200);
    };

    ItemsHandler.getitembyid = (request, reply) => {
        const { params } = request;
        const { id } = params;

        reply({
            statusCode: 200,
            code: 1,
            message: `items api requested by id: ${ id }`,
            content: {item: 'item1'}
        }).code(200);
    };

    ItemsHandler.getitembyname = (request, reply) => {
        const { params } = request;
        const { name } = params;

        reply({
            statusCode: 200,
            code: 1,
            message: `items api requested by name: ${ name }`,
            content: {item: 'item1'}
        }).code(200);
    };

    //
    // Schemas definition for Items
    // -----------------------------------------------------------------
    ItemsHandler.schema = {};
    ItemsHandler.schema.items = joi.object().keys({
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
        content: joi.array()
                    .required()
                    .items(joi.object())
                    .description('This is the response content, this holds the array of items')
                    .example([{name: 'Item1'}, {name: 'Item2'}])
    }).label('items');

    ItemsHandler.schema.item = joi.object().keys({
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
                    .description('This is the response content, this holds an object with the item properties')
                    .example({name: 'Item1'})
    }).label('item');

})();

export default ItemsHandler;
