import handlers from '../handlers';
import joi from 'joi';

const ThisModule = {};
const { itemshandler } = handlers;


ThisModule.getitems = {
    handler: itemshandler.all,
    description: 'Gets all items from database',
    notes: 'Gets all items from database does take limit on how many items are to be displayed',
    tags: ['api', 'all', 'items'],
    validate: {
        query: {
            from: joi.number()
                .integer()
                .default(0)
                .min(0)
                .description('Starting point of items in the item array')
                .example(1),
            limit: joi.number()
                .integer()
                .default(20)
                .min(0)
                .description('Limit of items to be displayed')
                .example(20)
        }
    },
    response: {
        schema: itemshandler.schema.items
    },
    auth: false
    // auth: {
    //     strategy: 'session',
    //     scope: 'user' // or [‘user’,’admin’]
    // }
};

ThisModule.getitembyname = {
    handler: itemshandler.getitembyname,
    description: 'Gets the item by name',
    notes: 'Gets the item by the name sent in the url',
    tags: ['api', 'item', 'name'],
    validate: {
        params: {
            name: joi.string()
                .required()
                .description('Item name to search for')
                .example('ABC1234567890')
        },
        headers: joi.object({
            'authorization': joi.string().required()
        }).unknown()
    },
    response: {
        schema: itemshandler.schema.item
    },
    auth: 'bearer'
    // auth: {
    //     strategy: 'session',
    //     scope: 'user' // or [‘user’,’admin’]
    // }
};

ThisModule.getitemsbycategoryname = {
    handler: itemshandler.getitemsbycategoryname,
    description: 'Gets the item by category name',
    notes: 'Gets an itemlist by the category name sent in the url',
    tags: ['api', 'items', 'by', 'category', 'name'],
    validate: {
        params: {
            name: joi.string()
                .required()
                .description('Category name to search for')
                .example('ABC1234567890')
        }
    },
    response: {
        schema: itemshandler.schema.items
    },
    auth: false
};

ThisModule.getcategorybyname = {
    handler: itemshandler.getcategorybyname,
    description: 'Gets category info by its name',
    notes: 'Gets the info by the category name sent in the url',
    tags: ['api', 'items', 'by', 'category', 'name'],
    validate: {
        params: {
            name: joi.string()
                .required()
                .description('Category name to search for')
                .example('ABC1234567890')
        }
    },
    response: {
        schema: itemshandler.schema.category
    },
    auth: false
};

export default ThisModule;
