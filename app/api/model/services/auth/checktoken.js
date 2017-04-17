/* jshint esversion: 6 */

import * as Firebase from 'firebase-admin';

const ThisModule = {};

(() => {

    ThisModule.checktoken = (token) => {
        Firebase.auth().verifyIdToken(token).then((decodedToken) => {
            const uid = decodedToken.sub;

            return uid;
        });
    };
})();

export default ThisModule;
