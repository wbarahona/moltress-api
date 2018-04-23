import itemcontroller from '../controllers/itemcontroller';

let ThisModule = [];

ThisModule = [
    {
        // All items route
        method: 'GET',
        path: '/api/v1/items/',
        config: itemcontroller.getitems
    },
    {
        // Get an item by name
        method: 'GET',
        path: '/api/v1/item/{name}',
        config: itemcontroller.getitembyname
    }
];

export default ThisModule;
