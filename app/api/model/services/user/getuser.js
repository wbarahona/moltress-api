/* jshint esversion: 6 */

import Promise from 'promise';
import * as Firebase from 'firebase-admin';
import config from '../../../../config';

const ThisModule = {};
const usersRef = config('/firebase/users');
const response = {
    code: 2,
    message: '',
    content: {}
};

//
// get user info by username
// --------------------------------------------------------
ThisModule.getuser = (uid) => {
    const db = Firebase.database();
    const ref = db.ref(usersRef);

    const promise = new Promise((resolve, reject) => {
        ref.orderByChild('uid').equalTo(uid).once('value', (snapshot) => {
            let userinfo = snapshot.val();

            // console.log(userinfo);

            if (userinfo) {
                userinfo = userinfo[Object.keys(userinfo)[0]];
                delete userinfo.password;
                response.code = 1;
                response.message = `User by uid: ${ uid }, was found. `;
                response.content = userinfo;
                resolve(response);
            } else {
                response.code = 0;
                response.message = `User by uid: ${ uid }, was not found. `;
                reject(response);
            }
        }).catch((err) => {
            response.code = 0;
            response.message = 'There is a error finding users';
            response.content = err;

            reject(response);
        });
    });

    return promise;
};

//
// get user info by email
// --------------------------------------------------------
ThisModule.getuserbyemail = (email) => {
    const promise = new Promise((resolve, reject) => {
        const db = Firebase.database();
        const ref = db.ref(usersRef);

        ref.orderByChild('email').equalTo(email).once('value', (snapshot) => {
            let userinfo = snapshot.val();

            if (userinfo) {
                userinfo = userinfo[Object.keys(userinfo)[0]];
                delete userinfo.password;
                response.code = 1;
                response.message = `User by email: ${ email }, was found. `;
                response.content = userinfo;
                resolve(response);
            } else {
                response.code = 0;
                response.message = `User by email: ${ email }, was not found. `;
                reject(response);
            }
        }).catch((err) => {
            // console.log(err);

            response.code = 0;
            response.message = `User by email: ${ email }, was not found. `;
            response.content = err;

            reject(response);
        });
    });

    return promise;
};

export default ThisModule;
