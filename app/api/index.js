import Glue from 'glue';
import routes from './routes';
import InitService from './model/services/init';
import SecurityService from './model/services/security';

//
// Bootstrap api here
// ----------------------------------------------------------
const ThisModule = {};
const { firebasetoken } = SecurityService;
const { init, getApp } = InitService;

ThisModule.init = (manifest, options) => {
    (async () => {
        try {
            const Server = await Glue.compose(manifest, options);

            Server.auth.strategy('bearer', 'bearer-access-token', firebasetoken);
            // Server.auth.strategy('session', 'cookie', true, cookieStrategy);
            Server.route(routes(Server));

            await Server.start();
            if (!getApp()) {
                init();
            }
            console.log('Server started', Server.info.uri);
        } catch (err) {
            console.log('An error has happened!');
            console.log(err);
            process.exit(1);
        }
    })();
};

export default ThisModule;
