import { Errors } from '../pages/SignUpPage/SignUpPage';
const emailUniquenessURL =
    'http://tweaxybackend.mywire.org/api/v1/users/checkEmailUniqueness';
const userUniquenessURL =
    'http://tweaxybackend.mywire.org/api/v1/users/checkUsernameUniqueness';

const apiCheckEmailUnique = async (email, setuniqueEmail) => {
    try {
        const response = await fetch(emailUniquenessURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email }),
        });

        const responseData = await response.json();
        console.log(responseData);
        // Handle the response data
        if (responseData.status == 'success') {
            setuniqueEmail(true);
        } else {
            Errors['Email'] = 'Email must be unique';
            setuniqueEmail(false);
        }
    } catch (error) {
        // Handle errors during the fetch
        console.error('There was a problem with the fetch operation:', error);
    }
};

const apicheckUsernameUnique = async (username, setuniqueUsername) => {
    console.log('From Api UNiqness', username);
    try {
        const response = await fetch(userUniquenessURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username }),
        });

        const responseData = await response.json();
        console.log(responseData);
        if (responseData.status == 'success') {
            setuniqueUsername(true);
        } else {
            Errors['Username'] = responseData.message;
            setuniqueUsername(false);
        }
    } catch (error) {
        // Handle errors during the fetch
        console.error('There was a problem with the fetch operation:', error);
    }
};

export { apiCheckEmailUnique, apicheckUsernameUnique };
