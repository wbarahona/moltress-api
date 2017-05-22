/* jshint esversion: 6 */

import * as Firebase from 'firebase-admin';
// import Firebase from 'firebase';
import serviceAccount from '~/app/config/credentials/serviceAccountKey.json';
import config from '~/app/config';

const ThisModule = {};
const rootref = config('/firebase/root');

let defaultApp;

ThisModule.init = () => {
    defaultApp = Firebase.initializeApp({
        credential: Firebase.credential.cert(serviceAccount),
        databaseURL: rootref
    });

    return defaultApp;
};

ThisModule.getApp = () => {
    return defaultApp;
};

export default ThisModule;
