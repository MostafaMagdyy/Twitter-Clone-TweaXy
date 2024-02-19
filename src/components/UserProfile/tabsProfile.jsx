import '../userProfile_components/tabsProfile.css';
import TweetsUSerLikes from './UserLikedTweets';
import UserTweets from './UserTweets';
import { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * TabsProfile component for displaying user profile tabs.
 * @param {Object} props - The props for the TabsProfile component.
 * @param {boolean} props.isTherePopUpWindow - Flag indicating if there's a pop-up window.
 * @param {string} props.userID - ID of the user.
 * @param {string} props.curUserID - ID of the current user.
 * @param {boolean} props.followedByMe - Flag indicating if the user is followed by the current user.
 * @param {Function} props.actionOccurredHandler - Handler for actions occurring in the component.
 * @param {Function} props.setnumposts - Function to set the number of posts.
 * @param {string} props.token - User authentication token.
 */
const TabsProfile = ({
    isTherePopUpWindow,
    userID,
    curUserID,
    followedByMe,
    actionOccurredHandler,
    setnumposts,
    token,
}) => {
    const [feedHeader_acitve, setActivePage] = useState(0);
    return (
        <>
            <div
                className={isTherePopUpWindow ? 'weak-feed-tabs' : 'feed-tabs'}
            >
                <div
                    style={{ flex: 0.5 }}
                    className="feed-haeder-element"
                    onClick={() => setActivePage(0)}
                >
                    <span
                        className={`${
                            feedHeader_acitve == 0 && '--feed-header-active'
                        }`}
                    >
                        Posts
                    </span>
                </div>
                <div
                    style={{ flex: 0.5 }}
                    className=" feed-haeder-element"
                    onClick={() => setActivePage(1)}
                >
                    <span
                        className={`${
                            feedHeader_acitve == 1 && '--feed-header-active'
                        }`}
                    >
                        Likes
                    </span>
                </div>
            </div>
            {feedHeader_acitve === 0 && (
                <UserTweets
                    userID={userID}
                    curUserID={curUserID}
                    followedByMe={followedByMe}
                    actionOccurredHandler={actionOccurredHandler}
                    setnumposts={setnumposts}
                    token={token}
                />
            )}
            {feedHeader_acitve === 1 && (
                <TweetsUSerLikes
                    userID={userID}
                    curUserID={curUserID}
                    token={token}
                />
            )}
        </>
    );
};
// PropTypes
TabsProfile.propTypes = {
    isTherePopUpWindow: PropTypes.bool.isRequired,
    userID: PropTypes.string.isRequired,
    curUserID: PropTypes.string.isRequired,
    followedByMe: PropTypes.bool.isRequired,
    actionOccurredHandler: PropTypes.func.isRequired,
    setnumposts: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
};
export default TabsProfile;
