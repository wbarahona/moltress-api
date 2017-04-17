/* jshint esversion: 6 */

import getuser from './getuser';
import saveuser from './saveuser';

let SecurityService = {};

(() => {
    SecurityService = { ... getuser, ... saveuser };
})();

export default SecurityService;
