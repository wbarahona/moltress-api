'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _usershandler = require('./usershandler');

var _usershandler2 = _interopRequireDefault(_usershandler);

var _itemshandler = require('./itemshandler');

var _itemshandler2 = _interopRequireDefault(_itemshandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Handlers = {};

Handlers.users = _usershandler2.default;
Handlers.items = _itemshandler2.default;

exports.default = Handlers;