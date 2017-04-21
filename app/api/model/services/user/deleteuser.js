/* jshint esversion: 6 */

import Promise from 'promise';
import * as Firebase from 'firebase-admin';
import Config from '../../../../config';
import user from './getuser';

const ThisModule = {};
const usersRef = Config.references.users;
const response = {
    code: 0,
    message: '',
    content: {}
};
const { getuser } = user;

(() => {
    //
    // Delete user to firebase
    // --------------------------------------------------------
    ThisModule.deleteuser = (id) => {
        const db = Firebase.database();
        const ref = db.ref(usersRef);

        const promise = new Promise((resolve, reject) => {

            getuser(id).then((resp) => {
                const { code, content } = resp;
                const { active } = content;

                if (code === 1 && active) {
                    ref.child(id).remove();
                    response.code = 1;
                    response.message = 'User was removed correctly.';
                } else {
                    response.code = 0;
                    response.message = 'User to be deleted is not active or not found.';
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
})();

export default ThisModule;
