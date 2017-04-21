/* jshint esversion: 6 */

import getuser from './getuser';
import saveuser from './saveuser';
import edituser from './edituser';
import deleteuser from './deleteuser';

let SecurityService = {};

(() => {
    SecurityService = { ... getuser, ... saveuser, ... edituser, ... deleteuser };
})();

export default SecurityService;
