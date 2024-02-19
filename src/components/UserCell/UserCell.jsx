import './UserCell.css';
import { useState } from 'react';
import { Avatar } from '@mui/material';
import unfollow from '../../apis/unfollow';
import follow from '../../apis/follow';
import { useNavigate } from 'react-router-dom';
import UsersCellsSelectors from '../../shared/selectors/UsersCells';
import React from 'react';
import PropTypes from 'prop-types';

/**
 *
 * @param {object} props - Component props.
 * @param {string} props.id - User ID.
 * @param {string} props.name - User's name.
 * @param {string} props.username - User's username.
 * @param {string} props.avatar - URL of the user's avatar.
 * @param {string} props.bio - User's bio.
 * @param {boolean} props.followsMe - Whether the user follows the current user.
 * @param {boolean} props.followedByMe - Whether the current user follows the user.
 * @param {string} props.token - Authorization token for API requests.
 * @param {string} props.myID - ID of the current user.
 * @returns {JSX.Element} - UserCell component.
 */
const UserCell = ({
    id,
    name,
    username,
    avatar,
    bio,
    followsMe,
    followedByMe,
    token,
    myID,
}) => {
    const navigate = useNavigate();
    const [isFollowingButtonHovered, setIsFollowingButtonHovered] =
        useState(false);
    const [followedByMeState, setFollowedByMeState] = useState(followedByMe);
    const handleFollowingButtonHover = () => {
        setIsFollowingButtonHovered(!isFollowingButtonHovered);
    };

    const goToUserProfile = () => {
        console.log(`redirecting to @${username}...`);
        navigate(`/profile/${username}`, { state: { userID: id } });
    };

    const FollowClick = async (event) => {
        event.stopPropagation();
        if (followedByMeState) {
            console.log(`unfollow @${username}..`);
            if (await unfollow(username, token)) {
                setFollowedByMeState(false);
            }
        } else {
            console.log(`follow @${username}..`);
            if (await follow(username, token)) {
                setFollowedByMeState(true);
            }
        }
    };

    return (
        <div className="user-cell-container" onClick={goToUserProfile}>
            <div className="user-cell-avatar-container">
                <Avatar
                    className="user-cell-avatar"
                    src={`https://tweaxybackend.mywire.org/api/v1/images/${avatar}`}
                    alt={name}
                />
            </div>
            <div className="user-cell-info-container">
                <div className="user-cell-upper-half">
                    <div className="user-cell-upper-left">
                        <span
                            data-test={UsersCellsSelectors.NAME}
                            className="user-cell-upper-left-top"
                        >
                            {name}
                        </span>
                        <div className="user-cell-upper-left-down">
                            <span
                                className="user-cell-username"
                                data-test={UsersCellsSelectors.USERNAME}
                            >{`@${username}`}</span>
                            {followsMe && (
                                <span className="user-cell-follows-me">
                                    Follows you
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="user-cell-upper-right">
                        {myID === id ? (
                            <></>
                        ) : (
                            <button
                                data-test={
                                    UsersCellsSelectors.FOLLOW_UNFOLLOW_BUTTON
                                }
                                className={
                                    followedByMeState === false
                                        ? 'black-small-button'
                                        : 'white-small-button'
                                }
                                onClick={FollowClick}
                                onMouseEnter={handleFollowingButtonHover}
                                onMouseLeave={handleFollowingButtonHover}
                            >
                                {followedByMeState === false
                                    ? 'Follow'
                                    : isFollowingButtonHovered
                                    ? 'Unfollow'
                                    : 'Following'}
                            </button>
                        )}
                    </div>
                </div>
                <div className="user-cell-lower-half">
                    <span>{bio}</span>
                </div>
            </div>
        </div>
    );
};
UserCell.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    followsMe: PropTypes.bool.isRequired,
    followedByMe: PropTypes.bool.isRequired,
    token: PropTypes.string.isRequired,
    myID: PropTypes.string.isRequired,
};

export default UserCell;
