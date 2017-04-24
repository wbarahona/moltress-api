/* jshint esversion: 6 */

import Bcrypt from 'bcrypt';

const ThisModule = {};
const saltRounds = 10;


//
// Encrypt plaintext
// -----------------------------------------------------------
ThisModule.hash = (plaintext) => {
    return Bcrypt.hash(plaintext, saltRounds);
};

//
// Compare passwords
// -----------------------------------------------------------
ThisModule.compare = (str1, hash) => {
    return Bcrypt.compare(str1, hash);
};

export default ThisModule;
