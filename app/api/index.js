/* jshint esversion: 6 */

import conf from '../config';
import routes from  './routes';
import Glue from 'glue';
import InitService from './model/services/init';
import SecurityService from './model/services/security';

//
// Bootstrap api here
// ----------------------------------------------------------
const { cookieStrategy } = SecurityService;
const { init } = InitService;

const { manifest } = conf('/');

const options = {
    relativeTo: __dirname
};

Glue.compose(manifest, options, (err, Server) => {

    if (err) {
        throw err;
    }
    Server.auth.strategy('session', 'cookie', true, cookieStrategy);
    Server.route(routes(Server));

    Server.start(() => {

        console.log('Server started', Server.info.uri);
    });
});

init();
