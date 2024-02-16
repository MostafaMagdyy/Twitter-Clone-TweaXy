const getnotifactions = `http://tweaxybackend.mywire.org/api/v1/notification`;
const getAllNotifications = async (token, _limit, _offset) => {
    console.log('from AllNotications token is', token);
    const urlWithQueryParam = `${getnotifactions}?limit=${_limit}?offset=${_offset}`;
    try {
        const response = await fetch(urlWithQueryParam, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const responseBody = await response.json();
        console.log('get notifacations response: ', responseBody);
        if (response.ok) {
            const Notifications = responseBody.data.notifications;
            return Notifications;
        } else {
            console.log('Error From Getting Notifacations Api');
            throw new Error(`Error: ${responseBody.status}`);
        }
    } catch (err) {
        console.error('Error getting user followers: ', err);
        throw err;
    }
};
export default getAllNotifications;
