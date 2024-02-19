import './Profile.css';
import '../homePage_components/Feed.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button } from '@mui/material';
import LoadingPage from '../../components/LoadingPage/LoadingPage';
import NotifyBox from '../../components/NotifyBox/NotifyBox';
import getUserDataApi from '../../apis/getProfileData';
import ProfileHeader from './ProfileHeader';
import TabsProfile from './tabsProfile';
import ProfileBio from './ProfileBio';
import PropTypes from 'prop-types'; // Import PropTypes

/**
 * Profile component for displaying user profile information and posts.
 * @param {object} props - The props for the Profile component.
 * @param {object} props.userData - User data including token and current user ID.
 * @param {string} props.userID - ID of the user whose profile is being viewed.
 * @param {Function} props.renderSidebar - Function to render the sidebar.
 * @param {Function} props.setavatar - Function to set the avatar.
 */

function Profile({ userData, userID, renderSidebar, setavatar }) {
    const token = userData.token;
    const currUserId = userData.currUserId;
    const [ndata, setData] = useState('');
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [numposts, setnumposts] = useState(0);
    const [viewPosts, setViewPosts] = useState(false);
    const [actionOccurred, setActionOccurred] = useState(true);
    const [actionMessage, setActionMessage] = useState('');
    const [curuser, setcuruser] = useState({});
    const viewPostsHandler = () => {
        setViewPosts(true);
    };
    const actionOccurredHandler = (message = '') => {
        setActionMessage(message);
        const timeoutId = setTimeout(() => {
            setActionMessage('');
        }, 3000);
        setActionOccurred(true);
        return () => clearTimeout(timeoutId);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await getUserDataApi({
                    id: userID,
                    token: token,
                });
                console.log('fetched data: ', fetchedData);
                setData(fetchedData);
                setcuruser(fetchedData.data.user);
                setViewPosts(!fetchedData.data.user.blockedByMe);
                setavatar(fetchedData.data.user.avatar);
                renderSidebar(true);
            } catch (error) {
                console.log('Failed With Error', error.message);
            } finally {
                setIsPageLoading(false);
            }
        };
        if (actionOccurred) {
            setIsPageLoading(true);
            fetchData();
            setActionOccurred(false);
        }
    }, [actionOccurred, token, userID]);

    if (isPageLoading) {
        return <LoadingPage />;
    }

    return (
        <>
            <div className="feed">
                <div className="profile">
                    <ProfileHeader
                        username={ndata.data.user.name}
                        noPosts={numposts}
                    />
                    <ProfileBio
                        curuser={curuser}
                        viewTweets={viewPosts}
                        actionOccurredHandler={actionOccurredHandler}
                        token={token}
                        currUserId={currUserId}
                    />
                    {ndata.data.user.blocksMe ? (
                        <div className="user-blocked-container">
                            <div className="span-container">
                                <span className="header-span">
                                    You're blocked
                                </span>
                                <span className="body-span">
                                    {`You can't follow or see @${ndata.data.user.username}'s posts.`}
                                </span>
                            </div>
                        </div>
                    ) : viewPosts !== true ? (
                        <div className="user-is-blocked-container">
                            <div className="span-container">
                                <span className="header-span">
                                    {`@${ndata.data.user.username} is blocked`}
                                </span>
                                <span className="body-span">
                                    {`Are you sure you want to view these posts? Viewing posts won't unblock @${ndata.data.user.username}. `}
                                </span>
                                <Button
                                    variant="outlined"
                                    className="view-posts-btn"
                                    onClick={viewPostsHandler}
                                    sx={{ lineHeight: 2.2, fontSize: 17 }}
                                >
                                    View posts
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <TabsProfile
                            userData={ndata.data.user}
                            userID={userID}
                            curUserID={currUserId}
                            followedByMe={ndata.data.user.followedByMe}
                            actionOccurredHandler={actionOccurredHandler}
                            setnumposts={setnumposts}
                            token={token}
                        />
                    )}
                </div>
                {actionMessage.length !== 0 && (
                    <NotifyBox text={actionMessage} />
                )}
            </div>
        </>
    );
}
// PropTypes
Profile.propTypes = {
    userData: PropTypes.shape({
        token: PropTypes.string.isRequired,
        currUserId: PropTypes.string.isRequired,
    }).isRequired,
    userID: PropTypes.string.isRequired,
    renderSidebar: PropTypes.func.isRequired,
    setavatar: PropTypes.func.isRequired,
};

export default Profile;
