/* jshint esversion: 6 */

import Promise from 'promise';
import * as Firebase from 'firebase-admin';
import SecurityService from '../security';
import config from '../../../../config';

const ThisModule = {};
const usersRef = config('/firebase/users');
const response = {
    code: 0,
    message: '',
    content: {}
};

//
// Edit user to firebase
// --------------------------------------------------------
ThisModule.edituser = (id, userinfo) => {
    const db = Firebase.database();
    const ref = db.ref(usersRef);

    const promise = new Promise((resolve) => {
        const { password } = userinfo;

        if (password) {
            SecurityService.hash(password).then((resp) => {
                userinfo.hash = resp;
                ref.child(id).update(userinfo);
                response.code = 1;
                response.message = 'User info updated correctly';
                resolve(response);
            });
        } else {
            ref.child(id).update(userinfo);
            response.code = 1;
            response.message = 'User info updated correctly';
            resolve(response);
        }
    });

    return promise;
};

export default ThisModule;
