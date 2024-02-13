import '../HomePage/HomePage.css';
import '../../components/homePage_components/Feed.css';
import Widget from '../../components/homePage_components/Widget';
import Sidebar from '../../components/homePage_components/Sidebar';
import LoadingPage from '../../components/LoadingPage/LoadingPage';
import Notificationcell1 from '../../components/Notifications/Notificationcell1';
import Notificationcell2 from '../../components/Notifications/Notificationcell2';
import Notificationcell3 from '../../components/Notifications/Notificationcell3';
import getAllNotifications from '../../apis/NotificationsApis/getAllNotifications';
import NotificationHeader from '../../components/Notifications/NotificationsHeader';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import getUserDataApi from '../../apis/getProfileData';

const NotificationPage = () => {
    const user = useSelector((state) => state.user.user);
    const token = useSelector((state) => state.user.token);
    const [avatar, setavatar] = useState(null);
    const [Notifications, setNotifications] = useState([]);
    const [isPageLoading, setIsPageLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await getUserDataApi({
                    id: user.id,
                    token: token,
                });
                setavatar(fetchedData.data.user.avatar);
            } catch (error) {
                console.log('Failed With Error', error.message);
            }
        };
        const fetchNotifications = async () => {
            try {
                const fetchedNotifications = await getAllNotifications(
                    token,
                    10,
                    0
                );
                setNotifications(fetchedNotifications);
                console.log('Notifications:', fetchedNotifications);
                setIsPageLoading(false);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };
        if (user && token) {
            fetchData();
            fetchNotifications();
        }
    }, [user, token]);

    if (isPageLoading) {
        return <LoadingPage />;
    }

    return (
        <>
            <div className="home-page">
                <Sidebar
                    userData={{ user, token }}
                    active={3}
                    avatar={avatar}
                />
                <div className="feed">
                    <NotificationHeader activePage={0} />
                    {Notifications.length > 0 &&
                        Notifications.map((cur, index) => {
                            if (cur.action === 'FOLLOW') {
                                return (
                                    <Notificationcell2
                                        key={index}
                                        fromuser={cur.fromUser}
                                        interaction={cur.interaction}
                                    />
                                );
                            } else if (
                                cur.action === 'LIKE' ||
                                cur.action === 'RETWEET'
                            ) {
                                return (
                                    <Notificationcell1
                                        key={index}
                                        action={cur.action}
                                        fromuser={cur.fromUser}
                                        interaction={cur.interaction}
                                        user={user}
                                    />
                                );
                            } else if (cur.action === 'REPLY') {
                                return (
                                    <Notificationcell3
                                        fromUser={cur.fromUser}
                                        interaction={cur.interaction}
                                        reply={cur.reply}
                                        uploadTime={cur.createdDate}
                                        token={token}
                                        curusername={user.username}
                                        userID={user.id}
                                        key={index}
                                    />
                                );
                            }
                        })}
                </div>
                <Widget />
            </div>
        </>
    );
};
export default NotificationPage;
