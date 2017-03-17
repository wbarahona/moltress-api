'use strict';
//
// Bootstrap api here
// ----------------------------------------------------------
    import config from '../config';
    import routes from  './routes';
    import Hapi from 'hapi';
    import Vision from 'vision';
    import Inert from 'inert';
    import Lout from 'lout';

    const server            = new Hapi.Server(config.cors);

    server.connection({
        host: 'localhost',
        port: 8001
    });

    server.route(routes(server));

    server.register([Vision, Inert, { register: Lout }], (err) => {});

    export default server;
