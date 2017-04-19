/* jshint esversion: 6 */

import Promise from 'promise';
import * as Firebase from 'firebase-admin';
import Config from '../../../../config';

const ThisModule = {};
const usersRef = Config.references.users;
const response = {
    code: 2,
    message: '',
    content: {}
};

(() => {
    //
    // get user info by username
    // --------------------------------------------------------
    ThisModule.getuser = (username) => {
        const db = Firebase.database();
        const ref = db.ref(usersRef);

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
})();

export default ThisModule;
