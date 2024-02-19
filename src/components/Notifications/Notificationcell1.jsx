import './Notificationcell.css';
import './NotificationsAvaters.css';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RepeatIcon from '@mui/icons-material/Repeat';
import { pink, green } from '@mui/material/colors';
import PropTypes from 'prop-types'; // Import PropTypes
import React from 'react';
/**
 * Notificationcell1 component for displaying notifications related to like or repost actions.
 * @param {Object} props - The props for the Notificationcell1 component.
 * @param {string} props.action - The action type ('LIKE' or 'RETWEET').
 * @param {Object} props.fromuser - The user who initiated the action.
 * @param {Object} props.interaction - The interaction details, including type and text.
 * @param {Object} props.user - The current user.
 * @returns JSX element representing the Notificationcell1 component.
 */
const Notificationcell1 = ({ action, fromuser, interaction, user }) => {
    const naviagate = useNavigate();
    const type = action == 'LIKE' ? 'liked' : 'reposted';
    const getreplieshandler = (event) => {
        naviagate(`/${user.username}/${interaction.id}`, {
            state: { tweetId: interaction.id },
        });
    };
    const routingHandlerProfile = (event) => {
        event.stopPropagation();
        console.log('routing to this user profile ');
        //route to the user profile
        naviagate(`/profile/${fromuser.username}`, {
            state: { userID: fromuser.id },
        });
    };
    return (
        <>
            <div className="tweet" onClick={getreplieshandler}>
                <div className="repost"></div>
                <div className="tweet-container">
                    <div className="avatar-container">
                        <div className="Notification-avatar-box1">
                            {type == 'liked' && (
                                <FavoriteIcon
                                    sx={{
                                        width: 30,
                                        height: 30,
                                        color: pink[500],
                                    }}
                                />
                            )}
                            {type == 'reposted' && (
                                <RepeatIcon
                                    sx={{
                                        width: 30,
                                        height: 30,
                                        color: green[500],
                                    }}
                                />
                            )}
                        </div>
                        <div
                            className="Notification-avatar-box2"
                            onClick={routingHandlerProfile}
                            data-testid="avatar"
                        >
                            <Avatar
                                src={`https://tweaxybackend.mywire.org/api/v1/images/${fromuser.avatar}`}
                                sx={{ width: 30, height: 30 }}
                            ></Avatar>
                        </div>
                    </div>
                    <div className="tweet-main">
                        <div className="Notfication-user">
                            <div className="InfoInteraction-container">
                                <span
                                    className="username"
                                    onClick={routingHandlerProfile}
                                >
                                    {fromuser.name}{' '}
                                </span>
                                <span className="Interaction">
                                    {type} your {interaction.type}
                                </span>
                            </div>
                        </div>
                        <div className="tweet-text-container">
                            {interaction.text}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
// PropTypes for Notificationcell1 component
Notificationcell1.propTypes = {
    action: PropTypes.oneOf(['LIKE', 'RETWEET']).isRequired,
    fromuser: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
    }).isRequired,
    interaction: PropTypes.shape({
        id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
    }).isRequired,
    user: PropTypes.object.isRequired,
};
export default Notificationcell1;
