import * as Firebase from 'firebase-admin';
import config from '../../../config';
import SecurityService from './security';
import MailService from './mail';
import TemplateService from './template';

const ThisModule = {};
const usersRef = config('/firebase/users');
const response = {
    code: 2,
    message: '',
    content: {}
};

//
// get user info by username
// --------------------------------------------------------
ThisModule.getuser = async (uid) => {
    const db = Firebase.database();
    const ref = db.ref(usersRef);

    try {
        const snapshot = await ref.orderByChild('uid').equalTo(uid).once('value');
        let userinfo = snapshot.val();

        if (userinfo) {
            userinfo = userinfo[Object.keys(userinfo)[0]];
            delete userinfo.password;
            delete userinfo.role;
            response.code = 1;
            response.message = `User by uid: ${ uid }, was found. `;
            response.content = userinfo;
        } else {
            response.code = 0;
            response.message = `User by uid: ${ uid }, was not found. `;
        }
    } catch(err) {
        response.code = 0;
        response.message = 'Find user operation was unsuccessful';
        response.content = err;
    }

    return response;
};

//
// get users complete info and profile by email
// --------------------------------------------------------
ThisModule.getuserprofilebyemail = async (email) => {
    const db = Firebase.database();
    const ref = db.ref(usersRef);
    let userprofile = null;

    try {
        const snapshot = ref.orderByChild('email').equalTo(email).once('value');

        userprofile = snapshot.val();

        response.code = 1;
        response.message = `Profile for ${ email } was found`;
        response.content = userprofile;
    } catch(err) {
        response.code = 0;
        response.message = `Info for ${ email } was unable to be retrieved`;
        response.content = err;
    }

    return response;
};

//
// get user by email
// --------------------------------------------------------
ThisModule.getuserbyemail = async (email) => {
    const db = Firebase.database();
    const ref = db.ref(usersRef);

    try {
        // let [userprofile, snapshot] = await Promise.all([Firebase.auth().getUserByEmail(email), ref.orderByChild('email').equalTo(email).once('value')]);
        const snapshot = await ref.orderByChild('email').equalTo(email).once('value');
        let userinfo = snapshot.val();

        // console.log(userprofile);
        // console.log(snapshot.val());

        if (userinfo) {
            userinfo = userinfo[Object.keys(userinfo)[0]];
            delete userinfo.role;
            response.code = 1;
            response.message = `User by email: ${ email }, was found. `;
            response.content = userinfo;
        } else {
            response.code = 0;
            response.message = `User by email: ${ email }, was not found. `;
        }
    } catch(err) {
        response.code = 0;
        response.message = `User by email: ${ email }, was not found. `;
        response.content = err;
    }

    return response;
};

//
// get user info by email returning password
// WARNING: THIS IS FOR INTERNAL USE ONLY
// --------------------------------------------------------
ThisModule.getuserbyemailwithpwd = async (email) => {
    const db = Firebase.database();
    const ref = db.ref(usersRef);

    try {
        const snapshot = await ref.orderByChild('email').equalTo(email).once('value');
        let userinfo = snapshot.val();

        if (userinfo) {
            userinfo = userinfo[Object.keys(userinfo)[0]];
            response.code = 1;
            response.message = `User by email: ${ email }, was found. `;
            response.content = userinfo;
        } else {
            response.code = 0;
            response.message = `User by email: ${ email }, was not found. `;
        }
    } catch(err) {
        response.code = 0;
        response.message = `User by email: ${ email } was not found`;
        response.content = err;
    }

    return response;
};

//
// Save user to firebase TODO: use firebase admin createUser method https://firebase.google.com/docs/auth/admin/manage-users#create_a_user
// generate a random password then hash it and send it to user for customize, save further info in db
// --------------------------------------------------------
ThisModule.saveuser = async (userinfo) => {
    const db = Firebase.database();
    const ref = db.ref(usersRef);
    const { buildemailoptions, sendmail } = MailService;
    const { getuserbyemail } = ThisModule;
    const appname = config('/appname');
    let tpl = null;

    try {
        const { email } = userinfo;
        let key = null;

        const userfound = await getuserbyemail(email);

        if (userfound) {
            // User is already created make the client know this specific scenario
            response.code = 3;
            response.message = `We found an error while searching for user: ${ userinfo.email } or this user already exists`;
        } else {
            // User search has been rejected which is not a bad thing, it means the email is not found
            // then we proceed to register this new user
            const random = SecurityService.makerandom();
            const securityResponse = await SecurityService.hash(random);

            userinfo.hash = securityResponse;

            const snapshot = await ref.push(userinfo);

            key = snapshot.key;

            const update = {code: key};

            tpl = TemplateService.gettemplate('newuser.html', userinfo);

            const emailopt = buildemailoptions(
                `"No Reply 👨‍💻" <no-reply@${ appname }.com>`,
                userinfo.email,
                'Welcome to yourappname',
                'Welcome to our services',
                tpl
            );

            sendmail(emailopt);

            const updateResponse = await ThisModule.edituser(key, update);

            response.code = updateResponse.code;
            response.message = updateResponse.message;
            response.content = {id: key};
        }
    } catch(err) {
        response.code = 0;
        response.message = 'Save user operation was unsuccessful';
        response.content = err;
    }

    return response;
};

//
// Edit user to firebase
// --------------------------------------------------------
ThisModule.edituser = async (id, userinfo) => {
    const db = Firebase.database();
    const ref = db.ref(usersRef);
    const { password } = userinfo;

    try {
        if (password) {
            const securityResponse = await SecurityService.hash(password);

            userinfo.hash = securityResponse;

            delete userinfo.password;
            ref.child(id).update(userinfo);
            response.code = 1;
            response.message = 'User info updated correctly';
        } else {
            ref.child(id).update(userinfo);
            response.code = 1;
            response.message = 'User info updated correctly';
        }
    } catch(err) {
        response.code = 0;
        response.message = 'Update user operation was unsuccessful';
        response.content = err;
    }

    return response;
};

//
// Delete user to firebase
// --------------------------------------------------------
ThisModule.deleteuser = async (id) => {
    const db = Firebase.database();
    const ref = db.ref(usersRef);
    const { getuser } = ThisModule;

    try {
        const userResponse = await getuser(id);
        const { code, content } = userResponse;
        const { active } = content;

        if (code === 1 && active) {
            ref.child(id).remove();
            response.code = 1;
            response.message = 'User was removed correctly';
        } else {
            response.code = 0;
            response.message = 'User to be deleted is not active or not found.';
        }
    } catch(err) {
        response.code = 0;
        response.message = 'Delete user operation was unsuccessful';
        response.content = err;
    }

    return response;
};

export default ThisModule;
