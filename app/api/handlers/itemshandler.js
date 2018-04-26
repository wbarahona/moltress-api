import joi from 'joi';
import ItemsService from '../model/services/item';
import FileService from '../model/services/file';

const ItemsHandler = {};
let statusCode = 500;
let code = 0;
let message = '';
let content = {};

ItemsHandler.all = async (request, h) => {
    const { query } = request;
    const { from, limit } = query;

    try {
        const itemsResponse = await ItemsService.getitems(from, limit);

        statusCode = (code === 1) ? 200 : 500;
        code = itemsResponse.code;
        message = itemsResponse.message;
        content = itemsResponse.content;
    } catch(err) {
        message = 'Items handler "all" operation was unsuccessful';
        content = err;
    }

    return h.response({
        statusCode,
        code,
        message,
        content
    }).code(statusCode);
};

ItemsHandler.getitembyid = async (request, h) => {
    const { params } = request;
    const { id } = params;

    try {
        const itemsResponse = await ItemsService.getitembyid(id);

        statusCode = (code === 1) ? 200 : 500;
        code = itemsResponse.code;
        message = itemsResponse.message;
        content = itemsResponse.content;
    } catch(err) {
        message = 'Items handler "getitembyid" operation was unsuccessful';
        content = err;
    }

    return h.response({
        statusCode,
        code,
        message,
        content
    }).code(statusCode);
};

ItemsHandler.getitembyname = async (request, h) => {
    const { params } = request;
    const { name } = params;

    try {
        const itemsResponse = await ItemsService.getitembyname(name);

        statusCode = (itemsResponse.code === 1) ? 200 : 500;
        code = itemsResponse.code;
        message = itemsResponse.message;
        content = itemsResponse.content;
    } catch(err) {
        message = 'Items handler "getitembyname" operation was unsuccessful';
        content = err;
    }

    return h.response({
        statusCode,
        code,
        message,
        content
    }).code(statusCode);
};

ItemsHandler.savefile = async (request, h) => {
    const { payload } = request;

    try {
        const fileResponse = await FileService.save(payload);

        statusCode = (fileResponse.code === 1) ? 200 : 500;
        code = fileResponse.code;
        message = fileResponse.message;
        content = fileResponse.content;
    } catch(err) {
        message = `Items handler "savefile" operation was unsuccessful: ${ err.message }`;
        content = err;
    }

    return h.response({
        statusCode,
        code,
        message,
        content
    }).code(statusCode);
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

//
// Schemas definition for Category
// -----------------------------------------------------------------
ItemsHandler.schema.category = joi.object().keys({
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
        .example({name: 'category1'})
}).label('item');

export default ItemsHandler;
