import './ProfileBio.css';
import { BiCalendar } from 'react-icons/bi';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditProfile from './EditProfileButton';
import parseDate from '../../utils/parseDate';
import { useState } from 'react';
import unfollow from '../../apis/unfollow';
import follow from '../../apis/follow';
import ProfilePageSelectors from '../../shared/selectors/ProfilePage';
import block from '../../apis/block';
import unblock from '../../apis/unblock';
import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

/**
 * ProfileBio component for displaying user profile information.
 * @param {Object} props - The props for the ProfileBio component.
 * @param {Object} props.curuser - Current user data.
 * @param {boolean} props.viewTweets - Flag indicating whether to view user tweets.
 * @param {Function} props.actionOccurredHandler - Handler for actions occurring in the component.
 * @param {string} props.token - User authentication token.
 * @param {string} props.currUserId - ID of the current user.
 */
const ProfileBio = (props) => {
    const [isFollowingButtonHovered, setIsFollowingButtonHovered] =
        useState(false);
    const [followedByMeState, setFollowedByMeState] = useState(
        props.curuser.followedByMe
    );
    const [isBlocked, setIsBlocked] = useState(props.curuser.blockedByMe);
    const handleFollowingButtonHover = () => {
        setIsFollowingButtonHovered(!isFollowingButtonHovered);
    };
    const navigate = useNavigate();
    const FollowClick = async (event) => {
        event.stopPropagation();
        if (followedByMeState) {
            if (await unfollow(props.curuser.username, props.token)) {
                setFollowedByMeState(false);
                props.actionOccurredHandler(
                    `You unfollowed @${props.curuser.username}`
                );
            }
        } else {
            if (await follow(props.curuser.username, props.token)) {
                setFollowedByMeState(true);
                props.actionOccurredHandler(
                    `You followed @${props.curuser.username}`
                );
            }
        }
    };
    const navigateToFollowingPage = () => {
        navigate(`/${props.curuser.username}/following`, {
            state: {
                name: props.curuser.name,
                username: props.curuser.username,
                userID: props.curuser.id,
            },
        });
    };

    const navigateToFollowersPage = () => {
        navigate(`/${props.curuser.username}/followers`, {
            state: {
                name: props.curuser.name,
                username: props.curuser.username,
                userID: props.curuser.id,
            },
        });
    };

    const handleUserBlock = async () => {
        if (isBlocked) {
            if (await unblock(props.curuser.username, props.token)) {
                window.location.reload();
                setIsBlocked(true);
            }
        } else {
            if (await block(props.curuser.username, props.token)) {
                window.location.reload();
                const timeoutID = setTimeout(() => {
                    setIsBlocked(true);
                }, 400);
                return () => clearTimeout(timeoutID);
            }
        }
    };
    return (
        <div className="biocontainer">
            <div className="backgroundImage">
                {props.curuser.cover && (
                    <img
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                        src={`https://tweaxybackend.mywire.org/api/v1/images/${props.curuser.cover}`}
                    />
                )}
            </div>
            <div className="profileTitle">
                <div className="profileImage">
                    <Avatar
                        sx={{ width: 134, height: 134 }}
                        src={`https://tweaxybackend.mywire.org/api/v1/images/${props.curuser.avatar}`}
                    />
                </div>
                {props.curuser.id === props.currUserId ? (
                    <EditProfile curuser={props.curuser} token={props.token} />
                ) : (
                    <div className="profile-buttons-container">
                        {props.curuser.blocksMe ? (
                            <></>
                        ) : isBlocked ? (
                            <button
                                className="red-btn"
                                onClick={handleUserBlock}
                            >
                                Unblock
                            </button>
                        ) : (
                            <>
                                <button
                                    className="red-btn"
                                    onClick={handleUserBlock}
                                >
                                    Block
                                </button>
                                <button
                                    className="white-btn"
                                    onClick={FollowClick}
                                    onMouseEnter={handleFollowingButtonHover}
                                    onMouseLeave={handleFollowingButtonHover}
                                    data-test={
                                        ProfilePageSelectors.FOLLOW_UNFOLLOW_BUTTON
                                    }
                                >
                                    {followedByMeState === false
                                        ? 'Follow'
                                        : isFollowingButtonHovered
                                        ? 'Unfollow'
                                        : 'Following'}
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
            <div className="profileBiography">
                <span className="profileBiography-username">
                    {props.curuser.name}
                </span>
                <span className="profileBiography-email">
                    @{props.curuser.username}
                </span>
                {!props.curuser.blocksMe && props.viewTweets && (
                    <div className="profileBiography-dateMargin">
                        <span className="profileBiography-Bio">
                            {props.curuser.bio === 'null'
                                ? ''
                                : props.curuser.bio}
                        </span>
                    </div>
                )}
                {!props.curuser.blocksMe && props.viewTweets && (
                    <div className="profileBiography-dateMargin">
                        <span className="profileBiography-joinDate">
                            <BiCalendar /> Joined{' '}
                            {parseDate(props.curuser.joinedDate)}
                        </span>
                    </div>
                )}
            </div>
            {!props.curuser.blocksMe && (
                <div className="profile-div-followers">
                    <span
                        className="follow-link"
                        onClick={navigateToFollowingPage}
                    >
                        <span className="profile-distance-between">
                            <span
                                className="profile-followers-following-number"
                                data-test={ProfilePageSelectors.FOLLOWING_COUNT}
                            >
                                {props.curuser._count.following}
                            </span>
                            <span
                                className="profile-followers-following-text"
                                data-test={ProfilePageSelectors.FOLLOWING_LINK}
                            >
                                Following
                            </span>
                        </span>
                    </span>
                    <span
                        className="follow-link"
                        onClick={navigateToFollowersPage}
                    >
                        <span
                            className="profile-followers-following-number"
                            data-test={ProfilePageSelectors.FOLLOWERS_COUNT}
                        >
                            {' '}
                            {props.curuser._count.followedBy}
                        </span>
                        <span
                            className="profile-followers-following-text"
                            data-test={ProfilePageSelectors.FOLLOWERS_LINK}
                        >
                            Followers
                        </span>
                    </span>
                </div>
            )}
        </div>
    );
};
// PropTypes
ProfileBio.propTypes = {
    curuser: PropTypes.object.isRequired,
    viewTweets: PropTypes.bool.isRequired,
    actionOccurredHandler: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    currUserId: PropTypes.string.isRequired,
};

export default ProfileBio;
