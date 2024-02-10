import {
    isEmailUniqueSchema,
    isUsernameUniqueSchema,
} from '../validations/userSchema';
import { passwordSchema } from '../validations/authSchema';
import { apiCheckEmailUnique, apicheckUsernameUnique } from './UniqnessApis';
import { Errors } from '../pages/SignUpPage/SignUpPage';
const isUniqeEmail = (usermail, setuniqueEmail) => {
    isEmailUniqueSchema
        .validate({
            body: {
                email: usermail,
            },
        })
        .then(() => {
            apiCheckEmailUnique(usermail, setuniqueEmail);
        })
        .catch((error) => {
            console.log(error.message);
            setuniqueEmail(false);
            Errors['Email'] = error.message;
        });
};
const isUniqueUsername = (username, setisuniqueusername) => {
    isUsernameUniqueSchema
        .validate({
            body: {
                username: username,
            },
        })
        .then(() => {
            apicheckUsernameUnique(username, setisuniqueusername);
        })
        .catch((error) => {
            console.log(error.message);
            setisuniqueusername(false);
            Errors['Username'] = error.message;
        });
};
const isAcceptebalePass = (pass, setAcceptedPass) => {
    passwordSchema
        .validate({
            body: {
                password: pass,
            },
        })
        .then(() => {
            setAcceptedPass(true);
        })
        .catch((error) => {
            setAcceptedPass(false);
        });
};
export { isUniqeEmail, isUniqueUsername, isAcceptebalePass };
