/* jshint esversion: 6 */

import simple from './simple';

const SecurityService = {};

(() => {
    const { simpleStrategy, cookieStrategy } = simple;

    SecurityService.simpleStrategy = simpleStrategy;
    SecurityService.cookieStrategy = cookieStrategy;
})();

export default SecurityService;
