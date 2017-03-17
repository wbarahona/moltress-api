'use strict';
//
// API configuration and global vars
// ------------------------------------------------------------------------

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _paths = require('./paths.ini');

var _paths2 = _interopRequireDefault(_paths);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const api = {};
api.paths = _paths2.default;
api.globalVars = {};
api.cors = {
    connections: {
        routes: {
            cors: true
        }
    }
};

exports.default = api;