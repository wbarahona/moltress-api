/*jshint esversion: 6 */

import config from '../config';
import routes from  './routes';
import Hapi from 'hapi';
import Vision from 'vision';
import Inert from 'inert';
import Lout from 'lout';

let Server = null;

(function () {
'use strict';
//
// Bootstrap api here
// ----------------------------------------------------------
    Server = new Hapi.Server(config.cors);

    Server.connection({
        host: 'localhost',
        port: 8001
    });

    Server.route(routes(Server));

    Server.register([Vision, Inert, { register: Lout }], (err) => {});
}());

export default Server;
