/* jshint esversion: 6 */

import Path from 'path';
import Fs from 'fs';

const SecurityService = {};
let serviceMethods = {};

Fs.readdirSync(__dirname).forEach((file) => {
    const serviceName = Path.basename(file, '.js');

    if (serviceName !== 'index') {
        serviceMethods = require(Path.join(__dirname, file)).default;

        for (const methodName in serviceMethods) {
            if (serviceMethods.hasOwnProperty(methodName)) {
                SecurityService[methodName] = serviceMethods[methodName];
            }
        }
    }
});

export default SecurityService;
