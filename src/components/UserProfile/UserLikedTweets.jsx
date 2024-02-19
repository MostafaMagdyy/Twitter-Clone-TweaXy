import '../homePage_components/Feed.css';
import Tweet from '../homePage_components/Tweet';
import GetTweetsuserLikes from '../../apis/tweetApis/UserLikedTweets';
import { useEffect, useState, useCallback, useRef } from 'react';
import { apiDeleteTweet } from '../../apis/tweetApis/deleteTweet';
import NotifyBox from '../../components/NotifyBox/NotifyBox';
import React from 'react';
import LoadingPage from '../LoadingPage/LoadingPage';
import PropTypes from 'prop-types';
/**
 * Renders a list of tweets liked by a specific user.
 *
 * @param {Object} props - The component props.
 * @param {string} props.userID - The ID of the user whose liked tweets are to be fetched.
 * @param {string} props.curUserID - The ID of the currently logged-in user.
 * @param {string} props.token - The authentication token for API requests.
 * @returns {JSX.Element} - The rendered component.
 */
const TweetsUSerLikes = ({ userID, curUserID, token }) => {
    const [tweets, setTweets] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(false);
    const observer = useRef();
    const [actionMessage, setActionMessage] = useState('');
    const fetchData = async () => {
        try {
            const tweetsResponse = await GetTweetsuserLikes(
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
    const handleTweetsFiltering = (message) => {
        setActionMessage(message);
        const timeoutId = setTimeout(() => {
            setActionMessage('');
        }, 3000);
        fetchData();
        return () => clearTimeout(timeoutId);
    };
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
                        handleTweetsFiltering={handleTweetsFiltering}
                        token={token}
                        followedByMe={tweet.mainInteraction.user.followedByMe}
                        isCurrentUserTweet={
                            curUserID === tweet.mainInteraction.user.id
                        }
                    />
                </div>
            ))}
            {actionMessage.length !== 0 && <NotifyBox text={actionMessage} />}
        </>
    );
};
TweetsUserLikes.propTypes = {
    userID: PropTypes.string.isRequired,
    curUserID: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
};
export default TweetsUSerLikes;
