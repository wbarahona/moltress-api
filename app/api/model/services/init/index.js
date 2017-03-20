/*jshint esversion: 6 */

import * as Firebase from 'firebase-admin';
// import Firebase from 'firebase';
import serviceAccount from './project-8357267294132255471-firebase-adminsdk-f695r-d802a4679f.json';

const ThisModule = {};

let defaultApp;

(function () {
    'use strict';

    ThisModule.init = () => {
        // defaultApp = Admin.initializeApp({
        //     credential: Admin.credential.cert(serviceAccount),
        //     databaseURL: 'https://hndelivery.firebaseio.com'
        // });

        // USERS SERVICE GET USER BY EMAIL
        // Admin.auth().getUserByEmail('wbarahona@live.com')
        // .then(function(userRecord) {
        // // See the UserRecord reference doc for the contents of userRecord.
        //     console.log('Successfully fetched user data:', userRecord.toJSON());
        // })
        // .catch(function(error) {
        //     console.log('Error fetching user data:', error);
        // });

        // UPDATE A NODE USING DEFAULT AUTH NOT RECOMENDED?
        // const defaultAuth = defaultApp.auth();
        // const defaultDatabase = defaultApp.database();
        //
        // const ref = defaultDatabase.ref('firedata');
        // const data = ref.child('test');
        //
        // data.push({more: 'tests'});


        Firebase.initializeApp({
            credential: Firebase.credential.cert(serviceAccount),
            databaseURL: 'https://hndelivery.firebaseio.com'
        });

        // var db = Firebase.database();
        // var ref = db.ref('firedata/users');
        // ref.on('child_added', function(snapshot) {
        //     var el = snapshot.val();
        //     console.log(el);
        //     console.log(snapshot.key);
        //
        //
        // });

        // var test = db.ref('firedata/test');
        // test.push({testingstuff: 'here1'});


        return defaultApp;
    };

    ThisModule.getApp = () => {
        return defaultApp;
    };
}());

export default ThisModule;
