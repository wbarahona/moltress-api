import * as Firebase from 'firebase-admin';

const ThisModule = {};
const response = {
    code: 0,
    message: '',
    content: {}
};

ThisModule.checkfirebaseauthtoken = async (payload) => {
    const { idtoken } = payload;

    try {
        const decodedToken = await Firebase.auth().verifyIdToken(idtoken);
        // const uid = decodedToken.uid;

        response.code = 1;
        response.message = `Token sent: ${ idtoken } was correctly verified`;
        response.content = decodedToken;
    } catch(err) {
        response.code = 0;
        response.message = 'Check Auth Token operation was unsuccessful';
        response.content = err;
    }

    return response;
};

export default ThisModule;
