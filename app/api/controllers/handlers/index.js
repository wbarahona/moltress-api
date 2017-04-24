/* jshint esversion: 6 */

import UsersHandler from './usershandler';
import ItemsHandler from './itemshandler';
import AuthHandler from './authentichandler';

const Handlers = {};

Handlers.users = UsersHandler;
Handlers.items = ItemsHandler;
Handlers.auth = AuthHandler;

export default Handlers;