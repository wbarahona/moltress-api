import conf from './app/config';
import api from './app/api';

const { init } = api;
const { manifest } = conf('/');
const options = {
    relativeTo: __dirname
};

init(manifest, options);

export default api;
