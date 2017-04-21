/* jshint esversion: 6 */

import usercontroller from './usercontroller';
import itemcontroller from './itemcontroller';
import authcontroller from './authcontroller';

const Controllers = {};

(() => {
    Controllers.usercontroller = usercontroller;
    Controllers.itemcontroller = itemcontroller;
    Controllers.authcontroller = authcontroller;
})();

export default Controllers;
