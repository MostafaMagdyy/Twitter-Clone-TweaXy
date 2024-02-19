import './Notificationcell.css';
import './NotificationsAvaters.css';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { cyan } from '@mui/material/colors';
import React from 'react';
import PropTypes from 'prop-types';
/**
 * Notificationcell2 component for displaying notifications related to follow actions.
 * @param {Object} props - The props for the Notificationcell2 component.
 * @param {Object} props.fromuser - The user who initiated the follow action.
 * @param {Object} props.interaction - Additional interaction details (if any).
 * @returns JSX element representing the Notificationcell2 component.
 */
const Notificationcell2 = ({ fromuser, interaction }) => {
    const navigate = useNavigate();
    const routingHandlerProfile = (event) => {
        event.stopPropagation();
        navigate(`/profile/${fromuser.username}`, {
            state: { userID: fromuser.id },
        });
    };
    const routingFollwers = () => {
        console.log(fromuser.name, fromuser.username, fromuser.id);
        navigate(`/${fromuser.username}/followers`, {
            state: {
                name: fromuser.name,
                username: fromuser.username,
                userID: fromuser.id,
            },
        });
    };
    return (
        <>
            <div className="tweet" onClick={routingFollwers}>
                <div className="repost"></div>
                <div className="tweet-container">
                    <div className="avatar-container">
                        <div className="Notification-avatar-box1">
                            <PersonAddIcon
                                sx={{ width: 30, height: 30, color: cyan[300] }}
                            />
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
                                    followed you
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
// PropTypes for Notificationcell2 component
Notificationcell2.propTypes = {
    fromuser: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
    }).isRequired,
    interaction: PropTypes.object, // Additional interaction details (optional)
};
export default Notificationcell2;
