/* jshint esversion: 6 */

import Promise from 'promise';
import * as Firebase from 'firebase-admin';

const ThisModule = {};
const response = {
    code: 2,
    message: '',
    content: {}
};

(() => {
    // get user info by username
    ThisModule.getuser = (username) => {
        const db = Firebase.database();
        const ref = db.ref('firedata/users');
        const promise = new Promise((resolve) => {
            ref.on('value', (snapshot) => {
                const itemsCollection = snapshot.val();

                response.code = 1;
                response.message = `fetched info now searching by ${ username }`;
                response.content = itemsCollection;
                resolve(response);
            });
        });

        return promise;
    };

    // get user info by email + password
    ThisModule.getuserbyemailandpassword = (email, password) => {
        const db = Firebase.database();
        const ref = db.ref('firedata/users');
        const promise = new Promise((resolve) => {
            ref.on('value', (snapshot) => {
                const itemsCollection = snapshot.val();

                for (const userid in itemsCollection) {
                    if (itemsCollection.hasOwnProperty(userid)) {
                        const userinfo = itemsCollection[userid];

                        // TODO: Bcrypt and ensure that on save user we encrypt the user
                        if (userinfo.email === email && userinfo.password === password) {
                            // remove password key
                            delete userinfo.password;
                            response.code = 1;
                            response.message = `User by email: ${ email }, was found!`;
                            response.content = userinfo;
                        }
                    }
                }

                if (response.code !== 1) {
                    response.message = `User by email: ${ email }, was not found or wrong credentials were provided`;
                }
                resolve(response);
            });
        });

        return promise;
    };
})();

export default ThisModule;
