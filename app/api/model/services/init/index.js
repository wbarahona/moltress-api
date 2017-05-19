/* jshint esversion: 6 */

import Path from 'path';
import Fs from 'fs';

const InitService = {};
let serviceMethods = {};

Fs.readdirSync(__dirname).forEach((file) => {
    const serviceName = Path.basename(file, '.js');

    if (serviceName !== 'index' && serviceName !== 'credentials') {
        serviceMethods = require(Path.join(__dirname, file)).default;

        for (const methodName in serviceMethods) {
            if (serviceMethods.hasOwnProperty(methodName)) {
                InitService[methodName] = serviceMethods[methodName];
            }
        }
    }
});

export default InitService;
