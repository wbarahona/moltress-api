/* jshint esversion: 6 */

import Bcrypt from 'bcrypt';

const ThisModule = {};

(() => {
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
            password: '12345',   // 'secret'
            name: 'Willmer Barahona',
            id: 'abc1234a',
            scope: 'user'
        }
    ];

    const validate = (request, username, password, callback) => {
        const user = users[username];

        if (!user) {
            return callback(null, false);
        }

        Bcrypt.compare(password, user.password, (err, isValid) => {
            callback(err, isValid, { id: user.id, name: user.name });
        });

        return true;
    };

    ThisModule.simpleStrategy = { validateFunc: validate };

    // TODO: these should go to the config object
    ThisModule.cookieStrategy = {
        password: 'somecrazycookiesecretthatcantbeguesseswouldgohere', // cookie secret
        cookie: 'app-cookie', // Cookie name
        isSecure: false, // required for non-https applications
        ttl: 24 * 60 * 60 * 1000
    };
})();

export default ThisModule;
