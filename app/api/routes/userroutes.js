/* jshint esversion: 6 */

import usercontroller from '../controllers/usercontroller';

let ThisModule = [];

ThisModule = [
    {
        // Get user info by id
        method: 'GET',
        path: '/api/v1/user/{id}',
        config: usercontroller.getuserbyid
    },
    {
        // Save new user
        method: 'POST',
        path: '/api/v1/user/',
        config: usercontroller.saveuser
    },
    {
        // Update a user
        method: 'PUT',
        path: '/api/v1/user/{id}',
        config: usercontroller.edituser
    },
    {
        // Deletes a user
        method: 'DELETE',
        path: '/api/v1/user/{id}',
        config: usercontroller.deleteuser
    }
];

export default ThisModule;
