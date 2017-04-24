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
// Save user to firebase
// --------------------------------------------------------
ThisModule.saveuser = (userinfo) => {
    const db = Firebase.database();
    const ref = db.ref(usersRef);

    const promise = new Promise((resolve) => {
        const { password } = userinfo;

        SecurityService.hash(password).then((resp) => {
            userinfo.hash = resp;
            ref.push(userinfo);
            response.code = 1;
            response.message = 'User info inserted correctly';
            resolve(response);
        });
    });

    return promise;
};

export default ThisModule;
