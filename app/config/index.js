/*jshint esversion: 6 */

import paths from './paths.ini';

const api = {};

(() => {
'use strict';
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
            'version': '0.0.1'
        }
    };
})();

export default api;
