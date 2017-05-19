/* jshint esversion: 6 */

import conf from './app/config';
import api from './app/api';

const { init } = api;
const { manifest } = conf('/');
const options = {
    relativeTo: __dirname
};

init(manifest, options, (err, Server) => {
    console.log('Server started', Server.info.uri);
});

export default api;
