import * as Firebase from 'firebase-admin';
import config from '../../../config';

const ThisModule = {};
const itemsRef = config('/firebase/items');
const response = {
    code: 2,
    message: '',
    content: {}
};

//
// get item list
// --------------------------------------------------------
ThisModule.getitems = async (from, limit) => {
    const db = Firebase.database();
    const ref = db.ref(itemsRef);
    const itemlist = [];
    let snapshot = null;
    let count = 0;

    try {
        snapshot = await ref.orderByChild('active').equalTo(true).once('value');
        const itemsCollection = snapshot.val();

        for (const itemid in itemsCollection) {
            if (itemsCollection.hasOwnProperty(itemid)) {
                if (from <= count && count <= limit) {
                    itemlist.push(itemsCollection[itemid]);
                }
                count++;
            }
        }
    } catch (err) {
        response.code = 0;
        response.message = 'There is a error finding items';
        response.content = err;
    }

    response.code = 1;
    response.message = `fetched items list from ${ from } to ${ limit }`;
    response.content = itemlist;

    return response;
};

//
// get item info by item id
// --------------------------------------------------------
ThisModule.getitembyid = async (id) => {
    const db = Firebase.database();
    const ref = db.ref(itemsRef);
    let iteminfo = null;

    try {
        const snapshot = await ref.orderByChild('id').equalTo(id).once('value');

        iteminfo = snapshot.val();
        if (iteminfo) {
            iteminfo = iteminfo[Object.keys(iteminfo)[0]];
            response.code = 1;
            response.message = `Item by id: ${ id }, was found. `;
            response.content = iteminfo;
        } else {
            response.code = 0;
            response.message = `Item by id: ${ id }, was not found. `;
        }
    } catch (err) {
        response.code = 0;
        response.message = 'There is a error finding items';
        response.content = err;
    }

    return response;
};

//
// get item info by item name
// --------------------------------------------------------
ThisModule.getitembyname = async (name) => {
    const db = Firebase.database();
    const ref = db.ref(itemsRef);

    try {
        const snapshot = await ref.orderByChild('name').equalTo(name).once('value');
        let iteminfo = snapshot.val();

        if (iteminfo) {
            iteminfo = iteminfo[Object.keys(iteminfo)[0]];
            response.code = 1;
            response.message = `Item by name: ${ name }, was found. `;
            response.content = iteminfo;
        } else {
            response.code = 0;
            response.message = `Item by name: ${ name }, was not found. `;
        }
    } catch(err) {
        response.message = 'Get item by name operation was unsuccessful';
        response.content = err;
    }

    return response;
};

export default ThisModule;
