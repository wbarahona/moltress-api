/* jshint esversion: 6 */

import paths from './paths.ini';
import pack from '../../package';

const api = {};

(() => {

//
// API configuration and global vars
// ------------------------------------------------------------------------
    api.paths  = paths;
    api.globalVars = {};
    api.cors = {
        connections: {
            routes: {
                cors: true
            }
        }
    };
    api.plugins = {};
    api.plugins.swagger = {};
    api.plugins.swagger.options = {
        info: {
            'title': 'API Documentation',
            'version': pack.version
        }
    };
})();

export default api;
