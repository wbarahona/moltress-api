/*jshint esversion: 6 */

import api from './app/api';

(function () {
    'use strict';

    if (!module.parent) {
        api.start(() => {
            console.log('Server started', api.info.uri);
        });
    } else {
        console.log('Server is instantated already');
    }
}());

export default api;
