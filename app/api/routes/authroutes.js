import authcontroller from '../controllers/authcontroller';

let ThisModule = [];

ThisModule = [
    {
        // Check firebase token
        method: 'POST',
        path: '/api/v1/check-firebase-token/',
        config: authcontroller.checkfirebaseauthtoken
    }
];

export default ThisModule;
