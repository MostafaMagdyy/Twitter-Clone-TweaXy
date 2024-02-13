const unfollow = async (username, token) => {
    const url = `https://tweaxybackend.mywire.org/api/v1/users/follow/${username}`;

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        console.log('unfollow response', response);

        if (!response.ok) {
            throw await response.json();
        }

        return true;
    } catch (error) {
        console.error(error.message);
    }
};

export default unfollow;
