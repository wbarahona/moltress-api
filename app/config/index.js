'use strict';
//
// API configuration and global vars
// ------------------------------------------------------------------------
    import paths from './paths.ini';
    
    const api                                     = {};
          api.paths                               = paths;
          api.globalVars                          = {};
          api.cors                                = {
                                                        connections: {
                                                            routes: {
                                                                cors: true
                                                            }
                                                        }
                                                  };

    export default api;
