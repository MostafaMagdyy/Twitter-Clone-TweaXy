import './NotificationsHeader.css';
import { useNavigate } from 'react-router-dom';
import React from 'react';
const NotificationHeader = ({ activePage }) => {
    const navigate = useNavigate();

    const onAllClickHandler = () => {
        if (activePage == 0) {
            return;
        }
        navigate('/notifications');
    };

    const onMentionsClickHandler = () => {
        if (activePage == 1) {
            return;
        }
        navigate('/notifications/mentions');
    };

    return (
        <div className="notifications-header-container">
            <div className="notifications-header">
                <span>Notifications</span>
            </div>
            <div className="notifications-header-navigator">
                <div className="nav-element" onClick={onAllClickHandler}>
                    <span
                        className={`${activePage == 0 && 'active-nav-element'}`}
                    >
                        All
                    </span>
                </div>
                <div className="nav-element" onClick={onMentionsClickHandler}>
                    <span
                        className={`${activePage == 1 && 'active-nav-element'}`}
                    >
                        Mentions
                    </span>
                </div>
            </div>
        </div>
    );
};
export default NotificationHeader;
