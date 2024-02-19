import './HomePage.css';
import Sidebar from '../../components/homePage_components/Sidebar';
import Profile from '../../components/userProfile_components/Profile';
import Widget from '../../components/homePage_components/Widget';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import LoadingPage from '../../components/LoadingPage/LoadingPage';
import { useLocation } from 'react-router';
const ProfilePage = () => {
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [userData, setUserData] = useState({});
    const [renderSidebar, setrenderSidebar] = useState(false);
    const [avatar, setavatar] = useState(null);
    const location = useLocation();
    const userID = location.state?.userID;
    const token = useSelector((state) => state.user.token);
    const user = useSelector((state) => state.user.user);
    const currUserId = useSelector((state) => state.user.user.id);
    useEffect(() => {
        if (token && userID && user && currUserId) {
            setUserData({ user, token, currUserId });
            setIsPageLoading(false);
            console.log('user id from profile page', userID);
            console.log('user token from profile page', token);
        } else {
            console.log('profile page is loading');
        }
    }, [token, userID, user, currUserId]);

    if (isPageLoading) {
        return <LoadingPage />;
    }

    return (
        <>
            <div className="home-page">
                {/**Side bar */}
                {renderSidebar && <Sidebar userData={userData} active={1} />}
                {/**News feed */}
                <Profile
                    userData={userData}
                    userID={userID}
                    renderSidebar={setrenderSidebar}
                    setavatar={setavatar}
                />
                {/**Widgets */}
                <Widget />
            </div>
        </>
    );
};

export default ProfilePage;
