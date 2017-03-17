'use strict';
//
// Bootstrap api here
// ----------------------------------------------------------

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _vision = require('vision');

var _vision2 = _interopRequireDefault(_vision);

var _inert = require('inert');

var _inert2 = _interopRequireDefault(_inert);

var _lout = require('lout');

var _lout2 = _interopRequireDefault(_lout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const server = new _hapi2.default.Server(_config2.default.cors);

server.connection({
    host: 'localhost',
    port: 8001
});

server.route((0, _routes2.default)(server));

server.register([_vision2.default, _inert2.default, { register: _lout2.default }], err => {});

exports.default = server;