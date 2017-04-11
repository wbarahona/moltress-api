/*jshint esversion: 6 */

import simple from './simple';

const SecurityService = {};

(() => {
    const { simpleStrategy } = simple;

    SecurityService.simpleStrategy = simpleStrategy;
})();

export default SecurityService;
