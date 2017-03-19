/*jshint esversion: 6 */

import paths from './paths.ini';

const api = {};

(function () {
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
}());

export default api;
