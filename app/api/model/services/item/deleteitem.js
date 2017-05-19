/* jshint esversion: 6 */

import Promise from 'promise';
import * as Firebase from 'firebase-admin';
import config from '../../../../config';
import item from './getitem';

const ThisModule = {};
const itemsRef = config('/firebase/items');
const response = {
    code: 2,
    message: '',
    content: {}
};
const { getitembyid } = item;

//
// Delete item to firebase
// --------------------------------------------------------
ThisModule.deleteitem = (id) => {
    const db = Firebase.database();
    const ref = db.ref(itemsRef);

    const promise = new Promise((resolve, reject) => {

        getitembyid(id).then((resp) => {
            const { code, content } = resp;
            const { active } = content;

            if (code === 1 && active) {
                ref.child(id).remove();
                response.code = 1;
                response.message = 'Item was removed correctly.';
            } else {
                response.code = 0;
                response.message = 'Item to be deleted is not active or not found.';
            }
            resolve(response);
        }, (err) => {
            ref.child(id).remove();
            response.code = 1;
            response.message = 'Request was rejected.';
            response.content = err;
            reject(response);
        });
    });

    return promise;
};

export default ThisModule;
