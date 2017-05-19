/* jshint esversion: 6 */

import joi from 'joi';
import ItemsService from '../model/services/item';

const ItemsHandler = {};

ItemsHandler.all = (request, reply) => {
    const { query } = request;
    const { from, limit } = query;

    ItemsService.getitems(from, limit).then((res) => {
        const { code, message, content } = res;

        reply({
            statusCode: 200,
            code: code,
            message: message,
            content: content
        }).code(200);
    }, (err) => {
        const { code, message, content } = err;

        reply({
            statusCode: 500,
            code: code,
            message: message,
            content: content
        }).code(500);
    });
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

    ItemsService.getitembyname(name).then((res) => {
        const { code, message, content } = res;

        reply({
            statusCode: 200,
            code: code,
            message: message,
            content: content
        }).code(200);
    }, (err) => {
        const { code, message, content } = err;

        reply({
            statusCode: 500,
            code: code,
            message: message,
            content: content
        }).code(500);
    });
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

export default ItemsHandler;
