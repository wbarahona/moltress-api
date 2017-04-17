/* jshint esversion: 6 */

import CheckToken from './checktoken';
import CreateToken from './createtoken';

let AuthService = {};

(() => {
    AuthService = { ... CheckToken, ... CreateToken };
})();

export default AuthService;
