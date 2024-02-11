const follow = async (username, token) => {
    const url = `http://tweaxybackend.mywire.org/api/v1/users/follow/${username}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        console.log('follow response', response);

        if (!response.ok) {
            throw await response.json();
        }

        return true;
    } catch (error) {
        console.error(error.message);
    }
};

export default follow;
