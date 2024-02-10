const urlProfileData = 'http://tweaxybackend.mywire.org/api/v1/users/';

const getUserDataApi = async ({ id, token }) => {
    const fullUrl = `${urlProfileData}${id}`;
    try {
        const response = await fetch(fullUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        console.log('Response from the API:', data);
        if (response.ok) {
            if (data.status === 'success') {
                console.log('data Profile get successfully');
                return data;
            } else {
                throw new Error(`Error: ${data.status}`);
            }
        } else {
            throw new Error(`Error: ${data.status}`);
        }
    } catch (err) {
        console.log(err);
    }
};

export default getUserDataApi;
