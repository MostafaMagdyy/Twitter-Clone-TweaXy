const UserTweetsURL = `http://tweaxybackend.mywire.org/api/v1/users`;

const GetuserTweets = async (userID, token, limit, offset) => {
    console.log('userID from gettweets is', userID, 'token is', token);
    const urlWithQueryParam = `${UserTweetsURL}/tweets/${encodeURIComponent(
        userID
    )}?limit=${limit}&offset=${offset}`;
    try {
        const response = await fetch(urlWithQueryParam, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            const responseData = await response.json();
            if (responseData.status === 'success') {
                const tweets = responseData;
                console.log('Ok ', tweets);
                return tweets;
            } else {
                console.log('Error From Failing the TweetAPI');
                throw new Error(`Error: ${responseData.status}`);
            }
        } else {
            throw new Error(`Error: ${response.status}`);
        }
    } catch (err) {
        console.error('Error getting user tweets: ', err);
        throw err;
    }
};

export default GetuserTweets;
