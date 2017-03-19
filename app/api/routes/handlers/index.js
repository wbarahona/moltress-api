/*jshint esversion: 6 */

import UsersHandler from './usershandler';
import ItemsHandler from './itemshandler';

const Handlers = {};

(function () {
'use strict';

    Handlers.users = UsersHandler;
    Handlers.items = ItemsHandler;
}());

export default Handlers;
