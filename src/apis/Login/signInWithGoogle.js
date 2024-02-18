const signInWithGoogle = async (response) => {
    const url = 'https://tweaxybackend.mywire.org/api/v1/auth/google';

    try {
        const fetchResponse = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: response.credential }),
        });

        if (!fetchResponse.ok) {
            const errorData = await fetchResponse.json();
            throw new Error(errorData.message);
        }

        const responseData = await fetchResponse.json();
        document.cookie = `token=${responseData.data.token}; Path=/; HttpOnly`;

        return responseData.data;
    } catch (error) {
        console.error('Error Signing in with google: ', error.message);
        throw error;
    }
};

export default signInWithGoogle;
