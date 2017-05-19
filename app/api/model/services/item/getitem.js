/* jshint esversion: 6 */

import Promise from 'promise';
import * as Firebase from 'firebase-admin';
import config from '../../../../config';

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
ThisModule.getitems = (from, limit) => {
    const db = Firebase.database();
    const ref = db.ref(itemsRef);
    const itemlist = [];

    const promise = new Promise((resolve, reject) => {
        ref.orderByChild('active').equalTo(true).once('value', (snapshot) => {
            const itemsCollection = snapshot.val();
            let count = 0;

            for (const itemid in itemsCollection) {
                if (itemsCollection.hasOwnProperty(itemid)) {
                    if (from <= count && count <= limit) {
                        itemlist.push(itemsCollection[itemid]);
                    }
                    count++;
                }
            }

            response.code = 1;
            response.message = `fetched items list from ${ from } to ${ limit }`;
            response.content = itemlist;

            resolve(response);
        }, (err) => {
            response.code = 0;
            response.message = 'There is a error finding items';
            response.content = err;

            reject(response);
        });
    });

    return promise;
};

//
// get item info by item id
// --------------------------------------------------------
ThisModule.getitembyid = (id) => {
    const db = Firebase.database();
    const ref = db.ref(itemsRef);

    const promise = new Promise((resolve, reject) => {
        ref.orderByChild('id').equalTo(id).once('value', (snapshot) => {
            let iteminfo = snapshot.val();

            if (iteminfo) {
                iteminfo = iteminfo[Object.keys(iteminfo)[0]];
                delete iteminfo.password;
                response.code = 1;
                response.message = `Item by id: ${ id }, was found. `;
                response.content = iteminfo;
                resolve(response);
            } else {
                response.code = 0;
                response.message = `Item by id: ${ id }, was not found. `;
                reject(response);
            }
        }).catch((err) => {
            response.code = 0;
            response.message = 'There is a error finding items';
            response.content = err;

            reject(response);
        });
    });

    return promise;
};

//
// get item info by item name
// --------------------------------------------------------
ThisModule.getitembyname = (name) => {
    const db = Firebase.database();
    const ref = db.ref(itemsRef);

    const promise = new Promise((resolve, reject) => {
        ref.orderByChild('name').equalTo(name).once('value', (snapshot) => {
            let iteminfo = snapshot.val();

            if (iteminfo) {
                iteminfo = iteminfo[Object.keys(iteminfo)[0]];
                delete iteminfo.password;
                response.code = 1;
                response.message = `Item by name: ${ name }, was found. `;
                response.content = iteminfo;
                resolve(response);
            } else {
                response.code = 0;
                response.message = `Item by name: ${ name }, was not found. `;
                reject(response);
            }
        }).catch((err) => {
            response.code = 0;
            response.message = 'There is a error finding items';
            response.content = err;

            reject(response);
        });
    });

    return promise;
};

export default ThisModule;
