/*jshint esversion: 6 */

import config from '../config';
import routes from  './routes';
import Hapi from 'hapi';
import Vision from 'vision';
import Inert from 'inert';
import Bcrypt from 'bcrypt';
import Basic from 'hapi-auth-basic';
import HapiSwagger from 'hapi-swagger';
import InitService from './model/services/init';
import SecurityService from './model/services/security';

let Server = null;

(() => {
'use strict';
//
// Bootstrap api here
// ----------------------------------------------------------
    const { simpleStrategy } = SecurityService;
    const { init } = InitService;
    const { cors, plugins } = config;
    const { swagger } = plugins;

    Server = new Hapi.Server(cors);

    Server.connection({
        host: 'localhost',
        port: 8001
    });

    Server.register([Vision, Inert, Basic, { register: HapiSwagger, options: swagger.options }], (err) => {
        Server.auth.strategy('simple', 'basic', simpleStrategy);
        Server.route(routes(Server));
    });

    init();
})();

export default Server;
