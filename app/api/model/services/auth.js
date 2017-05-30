/* jshint esversion: 6 */

import Promise from 'promise';
import SecurityService from './security';
import UserService from './user';
import EmailService from './mail';
import config from '~/app/config';

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

ThisModule.passwordreset = (email) => {
    const { getuserbyemail, edituser } = UserService;
    const { makerandom } = SecurityService;
    const { buildemailoptions, sendmail } = EmailService;
    const appname = config('/appname');
    const temppwd = makerandom();

    const promise = new Promise((resolve, reject) => {

        getuserbyemail(email).then((resp) => {
            const { code, content } = resp;
            const { active, fname, uid } = content;
            const guestinfo = { hash: '', password: '', hasrequestedpwd: false };

            if (code === 1 && active) {
                const emailopt = buildemailoptions(
                    `"No Reply 👨‍💻" <no-reply@${ appname }.com>`,
                    email,
                    'Your email recovery request',
                    'To reset your password follow this link',
                    `<p>Dear ${ fname },</p><p>We recived recently a password reset request from you.</p><p>Your temporary password is: <strong>${ temppwd }</strong></p><p>To change to a new password of your own please follow this <a href="http://application.com/restore">link</a>.</p><p>Regards,<br>The ${ appname } team.</p>`
                );

                guestinfo.password = temppwd;
                guestinfo.hasrequestedpwd = true;

                edituser(uid, guestinfo).then((userresp) => {
                    sendmail(emailopt).then((mailresp) => {
                        response.code = mailresp.code;
                        response.message = `Password was reset to a default password and emailed to: ${ email }`;
                        response.content = mailresp.content;

                        resolve(response);
                    }, (mailerr) => {
                        response.code = mailerr.code;
                        response.message = mailerr.message;

                        reject(response);
                    });
                }, (err) => {
                    response.code = err.code;
                    response.message = err.message;

                    reject(response);
                });
            } else {
                response.message = `User with email ${ email } is not active.`;
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
