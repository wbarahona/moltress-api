/* jshint esversion: 6 */

import config from '../config';
import routes from  './routes';
import Hapi from 'hapi';
import Vision from 'vision';
import Inert from 'inert';
// import Bcrypt from 'bcrypt';
// import Basic from 'hapi-auth-basic';
import Cookie from 'hapi-auth-cookie';
import HapiSwagger from 'hapi-swagger';
import InitService from './model/services/init';
import SecurityService from './model/services/security';

let Server = null;

(() => {

//
// Bootstrap api here
// ----------------------------------------------------------
    const { cookieStrategy } = SecurityService;
    const { init } = InitService;
    const { cors, plugins } = config;
    const { swagger } = plugins;

    Server = new Hapi.Server(cors);

    Server.connection({
        host: 'localhost',
        port: 8001
    });

    Server.register([Vision, Inert, Cookie, { register: HapiSwagger, options: swagger.options }], (err) => {
        // Server.auth.strategy('simple', 'basic', simpleStrategy);
        Server.auth.strategy('session', 'cookie', true, cookieStrategy);
        Server.route(routes(Server));
        if (err) {console.log(err);}
    });

    init();
})();

export default Server;
