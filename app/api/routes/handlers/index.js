'use strict';

import UsersHandler from './usershandler';
import ItemsHandler from './itemshandler';

const Handlers = {};

Handlers.users = UsersHandler;
Handlers.items = ItemsHandler;

export default Handlers;
