/* jshint esversion: 6 */

import * as Firebase from 'firebase-admin';
// import promise from 'promise';

const ThisModule = {};
const response = {
    code: 0,
    message: '',
    content: {}
};

(() => {

    ThisModule.createtoken = (uid) => {
        const promise = new Promise((resolve, reject) => {
            Firebase.auth().createCustomToken(uid).then((customToken) => {
                // Send token back to client
                // console.log(customToken);
                response.code = 1;
                response.message = `Token was created successfully for ${ uid }.`;
                response.content = {customToken: customToken};
                resolve(response);
            })
            .catch((error) => {
                // console.log('Error creating custom token:', error);
                response.message = `Error creating custom token ${ uid }.`;
                response.content = {error: error};
                reject(response);
            });
        });

        return promise;
    };
})();

export default ThisModule;
