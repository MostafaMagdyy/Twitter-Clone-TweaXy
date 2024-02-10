let PictureupdateUrl = 'http://tweaxybackend.mywire.org/api/v1/users';

const Pictureupload = async (_avater, authToken) => {
    console.log('Avatar is', _avater);
    console.log('auth token is ', authToken);
    const formData = new FormData();
    formData.append('avatar', _avater);
    try {
        const response = await fetch(PictureupdateUrl, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            body: formData,
        });
        const data = await response.json();
        console.log('Response from the API:', data);
        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Avatar update api:', error.message);
        throw error;
    }
};

export default Pictureupload;
