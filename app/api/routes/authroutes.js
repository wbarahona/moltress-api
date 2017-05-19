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
    }
];

export default ThisModule;
