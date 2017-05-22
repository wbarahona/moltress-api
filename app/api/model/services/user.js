/* jshint esversion: 6 */

import Promise from 'promise';
import * as Firebase from 'firebase-admin';
import config from '~/app/config';
import SecurityService from './security';

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

//
// Delete user to firebase
// --------------------------------------------------------
ThisModule.deleteuser = (id) => {
    const db = Firebase.database();
    const ref = db.ref(usersRef);

    const promise = new Promise((resolve, reject) => {
        const { getuser } = ThisModule;

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

export default ThisModule;
