/*jshint esversion: 6 */

import CheckToken from './checktoken';
import CreateToken from './createtoken';

const AuthService = {};

(function () {
    'use strict';

    AuthService.checktoken = CheckToken.checktoken;
    AuthService.createtoken = CreateToken.createtoken;
}());

export default AuthService;
