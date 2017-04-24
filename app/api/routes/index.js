/* jshint esversion: 6 */

import controllers from '../controllers';

let RoutesModule = null;

const { usercontroller, itemcontroller, authcontroller } = controllers;

const { getuserbyid, saveuser, edituser, deleteuser } = usercontroller;
const { getitems, getitembyname } = itemcontroller;
const { login, logout } = authcontroller;

RoutesModule = () => [
    getuserbyid,
    saveuser,
    edituser,
    deleteuser,
    getitems,
    getitembyname,
    login,
    logout
];

export default RoutesModule;
