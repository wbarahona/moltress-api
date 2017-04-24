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
    let userinfo = null;

    const promise = new Promise((resolve, reject) => {
        ref.on('value', (snapshot) => {
            const itemsCollection = snapshot.val();

            for (const id in itemsCollection) {
                if (itemsCollection.hasOwnProperty(id)) {
                    userinfo = itemsCollection[id];
                    if (userinfo.uid === uid) {
                        response.code = 1;
                        response.message = `fetched info searching by id: ${ uid }`;
                        response.content = userinfo;
                    }
                }
            }

            if (response.code !== 1) {
                response.message = `User by id: ${ uid }, was not found. `;
            }

            resolve(response);
        }, (err) => {
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
    const promise = new Promise((resolve) => {
        const db = Firebase.database();
        const ref = db.ref(usersRef);

        ref.on('value', (snapshot) => {
            const itemsCollection = snapshot.val();

            for (const userid in itemsCollection) {
                if (itemsCollection.hasOwnProperty(userid)) {
                    const userinfo = itemsCollection[userid];

                    if (userinfo.email === email && userinfo.active) {
                        // remove password key
                        delete userinfo.password;
                        response.code = 1;
                        response.message = `User by email: ${ email }, was found. `;
                        response.content = userinfo;
                    }
                }
            }

            if (response.code !== 1) {
                response.message = `User by email: ${ email }, was not found. `;
            }

            resolve(response);
        });
    });

    return promise;
};

export default ThisModule;
