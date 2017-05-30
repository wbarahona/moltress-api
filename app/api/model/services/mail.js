/* jshint esversion: 6 */

import Promise from 'promise';
import Nodemailer from 'nodemailer';
import config from '~/app/config';

const ThisModule = {};
const modresponse = {
    code: 0,
    message: '',
    content: {}
};
let transporter = null;

ThisModule.setupSMTP = () => {
    const { mail } = config('/');
    const { clients } = mail;
    const { name, username, password } = clients.gmail;

    // create reusable transporter object using the default SMTP transport
    transporter = Nodemailer.createTransport({
        service: name,
        auth: {
            user: username,
            pass: password
        }
    });
};

ThisModule.buildemailoptions = (from, to, subject, text, htmltemplate) => {
    // setup email data object so this method is
    // business / service agnostic
    return {
        from: from, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: htmltemplate // html body
    };
};

ThisModule.sendmail = (mailoptions) => {
    const promise = new Promise((resolve, reject) => {
        // send mail with defined transport object
        transporter.sendMail(mailoptions, (error, info) => {
            const { messageId, response } = info;

            if (error) {
                modresponse.code = 0;
                modresponse.message = 'There was an error sending the email.';
                modresponse.content = error;

                reject(modresponse);
            } else {
                modresponse.code = 1;
                modresponse.message = `Message ${ messageId } sent: ${ response }`;
                modresponse.content = info;

                resolve(modresponse);
            }

            return true;
        });
    });

    return promise;
};

export default ThisModule;
