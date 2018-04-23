import * as Firebase from 'firebase-admin';
import config from '../../../config';
import mail from './mail';

const serviceAccount = config('/serviceAccountKey');
const ThisModule = {};
const rootref = config('/firebase/root');

let defaultApp;

ThisModule.init = () => {
    defaultApp = Firebase.initializeApp({
        credential: Firebase.credential.cert(serviceAccount),
        databaseURL: rootref
    });
    mail.setupSMTP();

    return defaultApp;
};

ThisModule.getApp = () => {
    return defaultApp;
};

export default ThisModule;
