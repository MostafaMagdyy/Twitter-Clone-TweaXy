import '../userProfile_components/tabsProfile.css';
import TweetsUSerLikes from './UserLikedTweets';
import UserTweets from './UserTweets';
import { useState } from 'react';

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
export default TabsProfile;
