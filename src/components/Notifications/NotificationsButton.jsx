import './NotificationsButton.css';
import { useEffect, useState } from 'react';
import Badge from '@mui/material/Badge';
import { useNavigate } from 'react-router';
import { NotificationsActive, NotificationsNone } from '@mui/icons-material';
import getUnseenNotificationsCount from '../../apis/NotificationsApis/getUnseenNotificationsCount';
import PushNotification from '../../utils/PushNotifications';

const NotificationsButton = ({ active, token }) => {
    const [notificationsCount, setNotificationCount] = useState(0);
    const [updatecnt,setupdatecnt]=useState(true)
    const navigate = useNavigate();

    const handleNotificationsButtonClick = () => {
        navigate('/notifications');
    };

    useEffect(() => {
        const getCurUnseenNotificationCount = async () => {
            try {
                const curUnseenNotificationsCount =
                    await getUnseenNotificationsCount(token);
                console.log(
                    'cur notifications count: ',
                    curUnseenNotificationsCount
                );
                setNotificationCount(curUnseenNotificationsCount);
                setupdatecnt(false);
            } catch (error) {
                console.error(error.message);
                setNotificationCount(0);
            }
        };

        if (active === true) {
            setNotificationCount(0);
        } else if(updatecnt===true) {
            getCurUnseenNotificationCount();
        }
    }, [token, active,updatecnt]);

    return (
        <div
            className={`notifications-container ${
                active === true && 'active-notifications-container'
            }`}
            onClick={handleNotificationsButtonClick}
        >
            <PushNotification alert={()=>setupdatecnt(true)}/>
            {notificationsCount === 0 && (
                <div className="notifications-icon-wrapper">
                    <NotificationsNone />
                </div>
            )}
            {notificationsCount !== 0 && (
                <div className="notifications-icon-wrapper">
                    <Badge
                        color="primary"
                        badgeContent={notificationsCount}
                        max={9}
                    >
                        <NotificationsActive />
                    </Badge>
                </div>
            )}
            <h2>Notifications</h2>
        </div>
    );
};

export default NotificationsButton;
