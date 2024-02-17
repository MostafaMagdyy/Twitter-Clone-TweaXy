const urlFollowing = 'https://tweaxybackend.mywire.org/api/v1/users/followings/';

const getUserFollowing = async ({ username, token }) => {
    const fullUrl = `${urlFollowing}${username}`;

    try {
        const response = await fetch(fullUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        const responseBody = await response.text();
        console.log('get user following response: ', responseBody);

        if (response.ok) {
            const responseData = JSON.parse(responseBody);

            if (responseData.status === 'success') {
                const followings = responseData.data.followings;
                console.log(`@${username} is following: `, followings);
                return followings;
            } else {
                throw new Error(`Error: ${responseData.status}`);
            }
        } else {
            throw new Error(`Error: ${response.status}`);
        }
    } catch (err) {
        console.error('Error getting user following: ', err);
        throw err;
    }
};

export default getUserFollowing;
