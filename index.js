'use strict';

import api from './app/api';

if (!module.parent) {
    api.start(() => {
        console.log('Server started', api.info.uri);
    });
}

export default api;
