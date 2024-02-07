import { Errors } from '../pages/SignUpPage/SignUpPage';
let UsernameupdateUrl =
    'http://tweaxybackend.mywire.org/api/v1/users/updateUserName';
const UsernameUpdate = async (_username, authToken) => {
    console.log('auth token is ', authToken);
    try {
        const response = await fetch(UsernameupdateUrl, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
                username: _username,
            }),
        });
        const data = await response.json();
        console.log('Response from the API:', data);
        if (response.ok) {
            return _username;
        } else {
            Errors['Username'] = data.message;
            throw new Error(data.message);
        }
    } catch (error) {
        console.error('Username update api:', error.message);
        throw error;
    }
};

export default UsernameUpdate;
