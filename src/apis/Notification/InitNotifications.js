const url = `http://tweaxybackend.mywire.org/api/v1/notification/deviceTokenWeb`;

const InitNotifications = (token, WebToken) => {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            token: WebToken,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Response from the API:', data);
            if (data.status === 'success') {
                console.log('ok from Notifications');
            } else {
                console.log(data.message);
            }
        })
        .catch((error) => {
            throw new Error(error.message);
        });
};
export default InitNotifications;
