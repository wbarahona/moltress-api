/* jshint esversion: 6 */

import confidence from 'confidence';
import paths from './paths.ini';
import pack from '~/package';
import email from './credentials/emailCredentials';

//
// API configuration and global vars
// ------------------------------------------------------------------------
// TODO: implement a cache method

// ------------------------------------------------------------------------
// NOTE: email was sent to a unfindable file for reasons, but follow this
// structure below in the emailCredentials.json
// {
//   "clients": {
//     "server1": {
//       "username": "your.email@server1.com",
//       "password": "somepassword",
//       "name": "server1"
//     }
//   }
// }
// ------------------------------------------------------------------------

const conf = {
    paths: paths,
    env: process.env.NODE_ENV || 'dev',
    manifest: {
        server: {
            cache: false
        },
        connections: [
            // {
            //     port: 8000,
            //     labels: ['web']
            // },
            {
                host: 'localhost',
                port: 8001,
                labels: ['admin']
            }
        ],
        registrations: [
            { plugin: 'vision' },
            { plugin: 'inert' },
            { plugin: 'hapi-auth-cookie' },
            {
                plugin: {
                    register: 'hapi-swagger',
                    options: {
                        info: {
                            'title': 'API Documentation',
                            'version': pack.version
                        }
                    }
                }
            }
        ]
    },
    mail: email,
    appname: pack.name,
    firebase: {
        root: 'https://hndelivery.firebaseio.com',
        users: 'firedata/users',
        items: 'firedata/client_data/groceries/items'
    }
};

conf.store = new confidence.Store(conf);

const get = (key, opts = {}) => {

    const criteria = { ... conf, ... opts };

    return conf.store.get(key, criteria);
};

export default get;
