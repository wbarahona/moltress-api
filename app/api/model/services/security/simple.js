/*jshint esversion: 6 */

import Bcrypt from 'bcrypt';

const SecurityService = {};

(() => {
    const users = {
        john: {
            username: 'john',
            password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm',   // 'secret'
            name: 'John Doe',
            id: '2133d32a'
        }
    };

    const validate = (request, username, password, callback) => {
        const user = users[username];

        if (!user) {
            return callback(null, false);
        }

        Bcrypt.compare(password, user.password, (err, isValid) => {
            console.log(password, user.password, isValid);
            callback(err, isValid, { id: user.id, name: user.name });
        });
    };

    SecurityService.simpleStrategy = { validateFunc: validate };

    SecurityService.cookieStrategy = () => {

    };
})();

export default SecurityService;
