import handlers from '../handlers';
import joi from 'joi';

const ThisModule = {};
const { usershandler } = handlers;


ThisModule.getuserbyid = {
    handler: usershandler.getuserbyid,
    description: 'Gets the user by id',
    notes: 'Gets the user information by the user id',
    tags: ['api', 'user', 'info', 'id'],
    validate: {
        params: {
            id: joi.string()
                .required()
                .description('User id to search for')
                .example('ABC1234567890')
        },
        headers: joi.object({
            'authorization': joi.string().required()
        }).unknown()
    },
    response: {
        schema: usershandler.schema.user
    },
    auth: 'bearer'
    // auth: {
    //     strategy: 'bearer',
    //     scope: 'user' // or [‘user’,’admin’]
    // }
};

ThisModule.saveuser = {
    handler: usershandler.saveuser,
    description: 'Saves a new user',
    notes: 'Saves a new user into the database',
    tags: ['api', 'save', 'user'],
    validate: {
        payload: {
            active: joi.boolean()
                .required()
                .description('User is active? true / false')
                .example(false),
            age: joi.number()
                .min(18)
                .max(100)
                .required()
                .description('User\'s age')
                .example(20),
            agree: joi.boolean()
                .required()
                .description('User have agreeded terms of use')
                .example(false),
            code: joi.string()
                .required()
                .description('Firebase\'s UID for the user registered using their api')
                .example('92222fd1-c3a1-4d5d-bb1c-f029b339138e'),
            dateregister: joi.string()
                .required()
                .description('User\'s date when registered')
                .example('Wed Jun 07 2017 07:37:09 GMT-0600 (CST)'),
            email: joi.string()
                .required()
                .email()
                .description('User\'s email')
                .example('nathanexplosion@dethklok.com'),
            fname: joi.string()
                .required()
                .description('User\'s first name')
                .example('Nathan'),
            hasrequestedpwd: joi.boolean()
                .description('Has requested new password')
                .example(false),
            lname: joi.string()
                .required()
                .description('User\'s last name')
                .example('Explosion'),
            password: joi.string()
                .required()
                .min(6)
                .max(25)
                .description('User\'s password to login')
                .example('**********'),
            dob: joi.date()
                .timestamp()
                .required()
                .description('User\'s date of birth in javascript format ms')
                .example('1489881121232'),
            scope: joi.string()
                // .valid(authService.scopes)
                .example('user')
                .description('User\'s scope'),
            uid: joi.string()
                .required()
                .description('Firebase\'s UID for the user registered using their api')
                .example('92222fd1-c3a1-4d5d-bb1c-f029b339138e')
        },
        headers: joi.object({
            'authorization': joi.string().required()
        }).unknown()
    },
    response: {
        schema: usershandler.schema.user
    },
    auth: 'bearer'
};

ThisModule.edituser = {
    handler: usershandler.edituser,
    description: 'Edit the user',
    notes: 'Edits a user into in the database using the id',
    tags: ['api', 'edit', 'user', 'id'],
    validate: {
        params: {
            id: joi.string()
                .description('User id to edit')
                .example('ABC1234567890')
        },
        payload: {
            active: joi.boolean()
                .description('User is active? true / false')
                .example(false),
            age: joi.number()
                .min(18)
                .max(100)
                .description('User\'s age')
                .example(20),
            agree: joi.boolean()
                .required()
                .description('User have agreeded terms of use')
                .example(false),
            code: joi.string()
                .required()
                .description('Firebase\'s UID for the user registered using their api')
                .example('92222fd1-c3a1-4d5d-bb1c-f029b339138e'),
            dateregister: joi.string()
                .required()
                .description('User\'s date when registered')
                .example('Wed Jun 07 2017 07:37:09 GMT-0600 (CST)'),
            email: joi.string()
                .email()
                .description('User\'s email')
                .example('nathanexplosion@dethklok.com'),
            fname: joi.string()
                .description('User\'s first name')
                .example('Nathan'),
            hasrequestedpwd: joi.boolean()
                .description('Has requested new password')
                .example(false),
            lname: joi.string()
                .description('User\'s last name')
                .example('Explosion'),
            password: joi.string()
                .min(6)
                .max(25)
                .description('User\'s password to login')
                .example('**********'),
            dob: joi.date()
                .timestamp()
                .description('User\'s date of birth in javascript format ms')
                .example('1489881121232'),
            scope: joi.string()
                // .valid(authService.scopes)
                .description('User\'s scope'),
            uid: joi.string()
                .required()
                .description('Firebase\'s UID for the user registered using their api')
                .example('92222fd1-c3a1-4d5d-bb1c-f029b339138e')
        },
        headers: joi.object({
            'authorization': joi.string().required()
        }).unknown()
    },
    response: {
        schema: usershandler.schema.user
    },
    auth: 'bearer'
    // auth: {
    //     strategy: 'session',
    //     scope: 'user' // or [‘user’,’admin’]
    // }
};

ThisModule.deleteuser = {
    handler: usershandler.deleteuser,
    description: 'Delete the user',
    notes: 'Delete a user from the database using the id',
    tags: ['api', 'delete', 'user', 'id'],
    validate: {
        params: {
            id: joi.string()
                .description('User id to delete')
                .example('ABC1234567890')
        },
        headers: joi.object({
            'authorization': joi.string().required()
        }).unknown()
    },
    response: {
        schema: usershandler.schema.user
    },
    auth: 'bearer'
    // auth: {
    //     strategy: 'session',
    //     scope: 'user' // or [‘user’,’admin’]
    // }
};

export default ThisModule;
