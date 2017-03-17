'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _api = require('./app/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!module.parent) {
    _api2.default.start(() => {
        console.log('Server started', _api2.default.info.uri);
    });
}

exports.default = _api2.default;