/* jshint esversion: 6 */

import authcontroller from '../controllers/authcontroller';

let ThisModule = [];

ThisModule = [
    {
        // Login route
        method: 'POST',
        path: '/api/v1/login/',
        config: authcontroller.login
    },
    {
        // Log out route
        method: 'POST',
        path: '/api/v1/logout/',
        config: authcontroller.logout
    },
    {
        // Get new temporal password
        method: 'POST',
        path: '/api/v1/password-recovery/',
        config: authcontroller.passwordrecovery
    }
];

export default ThisModule;
