/* jshint esversion: 6 */


import routes from  './routes';
import Glue from 'glue';
import InitService from './model/services/init';
import SecurityService from './model/services/security';

//
// Bootstrap api here
// ----------------------------------------------------------
const { cookieStrategy } = SecurityService;
const { init, getApp } = InitService;

exports.init = (manifest, options, cb) => {
    Glue.compose(manifest, options, (err, Server) => {

        if (err) {
            throw err;
        }
        Server.auth.strategy('session', 'cookie', true, cookieStrategy);
        Server.route(routes(Server));

        Server.start((_err) => {

            cb(_err, Server);
        });
    });

    if (!getApp()) {
        init();
    }
};
