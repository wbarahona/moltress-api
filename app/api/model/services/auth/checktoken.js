/*jshint esversion: 6 */

import * as Firebase from 'firebase-admin';

const ThisModule = {};

(function () {
    'use strict';

    ThisModule.checktoken = (token) => {
        Firebase.auth().verifyIdToken(token).then(function(decodedToken) {
            var uid = decodedToken.sub;
        });
    };
}());

export default ThisModule;
