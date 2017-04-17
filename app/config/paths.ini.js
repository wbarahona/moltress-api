/* jshint esversion: 6 */

const paths = {};

(() => {

//
// API PATHS SHALL BE DECLARED HERE BOY!
// ---------------------------------------------------------------------------------------
    // ROOT
    paths.root = '.';
    paths.here = '.';
    paths.back = '..';

    // APP
    paths.app = {};
    paths.app.root = `${ paths.root }/app`;
    paths.app.api = `${ paths.app.root }/api`;

    // MODELS
    paths.model = {};
    paths.model.root = `${ paths.app.api }/model`;
    paths.services = {};
    paths.services.root  = `${ paths.model.root }/services`;
    paths.services.users = `${ paths.services.root }/users`;

    // ROUTES
    paths.routes = {};
    paths.routes.root = `${ paths.app.api }/routes`;
    paths.routes.users = `${ paths.routes.root }/users`;
})();

export default paths;
