import { useState, useEffect, useRef, useCallback, React } from 'react';
import GetuserTweets from '../../apis/tweetApis/UserTweet';
import { apiDeleteTweet } from '../../apis/tweetApis/deleteTweet';
import LoadingPage from '../LoadingPage/LoadingPage';
import Tweet from '../homePage_components/Tweet';
import PropTypes from 'prop-types'; // Import PropTypes

/**
 * UserTweets component for displaying tweets of a user.
 * @param {Object} props - The props for the UserTweets component.
 * @param {string} props.userID - The ID of the user whose tweets are being displayed.
 * @param {string} props.curUserID - The ID of the current user.
 * @param {boolean} props.followedByMe - Indicates whether the current user follows the user whose tweets are being displayed.
 * @param {Function} props.actionOccurredHandler - Function to handle actions that occur.
 * @param {Function} props.setnumposts - Function to set the number of posts.
 * @param {string} props.token - User authentication token.
 */
const UserTweets = ({
    userID,
    curUserID,
    followedByMe,
    actionOccurredHandler,
    setnumposts,
    token,
}) => {
    const [tweets, setTweets] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(false);
    const observer = useRef();

    const fetchData = async () => {
        try {
            const tweetsResponse = await GetuserTweets(
                userID,
                token,
                10,
                offset
            );
            console.log('user tweet response', tweetsResponse);

            setTweets((prevTweets) => {
                setLoading(false);
                return [...prevTweets, ...tweetsResponse.data.items].filter(
                    (tweet, index, self) =>
                        index ===
                        self.findIndex(
                            (t) =>
                                t.mainInteraction.id ===
                                tweet.mainInteraction.id
                        )
                );
            });
            setnumposts(tweetsResponse.pagination.totalCount);
            setHasMore(tweetsResponse.data.items.length > 0);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user tweets:', error);
            setLoading(false);
        }
    };

    const removeTweet = async (tweetId) => {
        try {
            await apiDeleteTweet(tweetId, token);
            setTweets((prevTweets) =>
                prevTweets.filter(
                    (tweet) => tweet.mainInteraction.id !== tweetId
                )
            );
        } catch (error) {
            console.error('Error deleting tweet:', error);
        }
    };

    const lastTweetElementRef = useCallback(
        (node) => {
            if (loading || !hasMore) return;

            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setOffset((prevOffset) => prevOffset + 10);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    useEffect(() => {
        fetchData();
    }, [offset]);

    if (loading) {
        return <LoadingPage />;
    }

    return (
        <>
            {tweets.map((tweet, index) => (
                <div
                    key={index}
                    ref={
                        tweets.length === index + 1 ? lastTweetElementRef : null
                    }
                >
                    <Tweet
                        tweet={tweet}
                        removeTweet={removeTweet}
                        handleTweetsFiltering={actionOccurredHandler}
                        token={token}
                        followedByMe={followedByMe}
                        isCurrentUserTweet={
                            curUserID === tweet.mainInteraction.user.id
                        }
                    />
                </div>
            ))}
        </>
    );
};
// PropTypes
UserTweets.propTypes = {
    userID: PropTypes.string.isRequired,
    curUserID: PropTypes.string.isRequired,
    followedByMe: PropTypes.bool.isRequired,
    actionOccurredHandler: PropTypes.func.isRequired,
    setnumposts: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
};
export default UserTweets;
