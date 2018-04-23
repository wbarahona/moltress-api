// bcrypt-nodejs
import Bcrypt from 'bcrypt-nodejs';
import Promise from 'promise';
import AuthService from './auth';
import config from '../../../config';

const ThisModule = {};
const users = [
    {
        username: 'john',
        password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm',   // 'secret'
        name: 'John Doe',
        id: '2133d32a',
        scope: ['user', 'admin']
    },
    {
        username: 'wbarahona',
        password: '12345',   // 'secret' LOL
        name: 'Jane Doe',
        id: 'abc1234a',
        scope: 'user'
    }
];
const validate = (request, username, password, callback) => {
    const user = users[username];

    if (!user) {
        return callback(null, false);
    }

    Bcrypt.compareSync(password, user.password, (err, isValid) => {
        callback(err, isValid, { id: user.id, name: user.name });
    });

    return true;
};

ThisModule.simpleStrategy = { validateFunc: validate };

ThisModule.cookieStrategy = config('/cookieStrategy');
ThisModule.cookieStrategy.ttl = 24 * 60 * 60 * 1000;

//
// Make random string
// -----------------------------------------------------------
ThisModule.makerandom = () => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';
    let text = '';

    for (let i = 0; i < 15; i++ ) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};

//
// Encrypt plaintext
// -----------------------------------------------------------
ThisModule.hash = async (plaintext) => {
    const promise = new Promise((resolve, reject) => {
        Bcrypt.hash(plaintext, null, null, (err, res) => { // bcrypt response is not a promise we can not use await
            if (res) {
                resolve(res);
            } else {
                reject(err);
            }
        });
    });

    return promise;
};

//
// Compare passwords
// -----------------------------------------------------------
ThisModule.compare = async (str1, hash) => {
    const promise = new Promise((resolve, reject) => {
        Bcrypt.compare(str1, hash, (err, res) => { // bcrypt response is not a promise we can not use await
            if (!err) {
                resolve(res);
            } else {
                reject(err);
            }
        });
    });

    return promise;
};

//
// Firebase Token strategy
// -----------------------------------------------------------
ThisModule.firebasetoken = {
    allowMultipleHeaders: true,
    validate: async (request, token) => {
        // here is where you validate your token
        // comparing with token validation from firebase
        const payload = { idtoken: token };
        let isValid = false;
        let credentials = {};
        let artifacts = {};

        try {
            const authResponse = await AuthService.checkfirebaseauthtoken(payload);
            const { code } = authResponse;

            if (code === 1) {
                isValid = true;
                credentials = { token };
                artifacts = { test: 'info' };
            } else {
                isValid = false;
            }
        } catch(err) {
            isValid = false;
        }

        return { isValid, credentials, artifacts };
    }
};

export default ThisModule;
