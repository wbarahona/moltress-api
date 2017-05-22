/* jshint esversion: 6 */

import Promise from 'promise';
import SecurityService from './security';
import UserService from './user';

const ThisModule = {};
const response = {
    code: 0,
    message: '',
    content: {}
};

ThisModule.loginemail = (email, password) => {
    const { getuserbyemail } = UserService;
    const { compare } = SecurityService;

    const promise = new Promise((resolve, reject) => {

        getuserbyemail(email).then((resp) => {
            const { code, message, content } = resp;
            const { hash, active } = content;

            if (code === 1 && active) {
                compare(password, hash).then((compareValid) => {
                    if (compareValid) {
                        response.code = 1;
                        response.message = `${ message } User credentials are correct.`;
                        response.content = content;
                    } else {
                        response.message = 'User credentials are invalid.';
                        response.content = {};
                    }
                    resolve(response);
                }, (err) => {
                    response.code = 0;
                    response.message = 'something went wrong comparing the password, promise was rejected!';
                    response.content = err;

                    reject(response);
                });
            } else {
                response.code = 0;
                response.message = `User with email: ${ email } was not found or is inactive`;

                reject(response);
            }
        }, (err) => {
            const { message, content } = err;

            response.message = message;
            response.content = content;

            reject(response);
        });
    });

    return promise;
};

export default ThisModule;
