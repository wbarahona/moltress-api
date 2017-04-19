/* jshint esversion: 6 */

import Promise from 'promise';
import SecurityService from '../security';
import UserService from '../user';

const AuthService = {};
const response = {
    code: 0,
    message: '',
    content: {}
};

(() => {
    AuthService.loginemail = (email, password) => {
        const { getuserbyemail } = UserService;
        const { compare } = SecurityService;

        const promise = new Promise((resolve, reject) => {

            getuserbyemail(email).then((resp) => {
                const { code, message, content } = resp;
                const { hash } = content;

                if (code === 1) {
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
                    });
                }
            }, (err) => {
                response.message = 'There was a rejected process while getting user by email.';
                response.content = err;
                reject(response);
            });
        });

        return promise;
    };
})();

export default AuthService;
