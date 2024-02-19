import SidebarOption from './SidebarOption';
import TwitterIcon from '@mui/icons-material/Twitter';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchIcon from '@mui/icons-material/Search';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SettingsIcon from '@mui/icons-material/Settings';
import Button from '@mui/material/Button';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';
import AccountButton from '../AccountButton/AccountButton';
import NotificationsButton from '../NotificationsButton/NotificationsButton';
import HomePageSelectors from '../../shared/selectors/HomePage';
import ConversationsButton from '../ConversationsButton/ConversationsButton';
import PropTypes from 'prop-types';

/**
 * Component representing the sidebar navigation menu.
 *
 * @param {object} props - Component props.
 * @param {object} props.userData - Object containing user data.
 * @param {number} props.active - Index of the active sidebar option.
 * @param {function} props.setIsTherePopUpWindow - Function to set whether there is a popup window.
 * @returns {JSX.Element} - Sidebar component.
 */

export default function Sidebar({ userData, active, setIsTherePopUpWindow }) {
    const navigate = useNavigate();
    const toProfile = () => {
        navigate(`/profile/${userData.user.username}`, {
            state: { userID: userData.user.id },
        });
    };

    const toHome = () => {
        navigate('/home', {
            state: { userData: { userData }, firstTime: false },
        });
    };

    return (
        <div className="sidebar">
            <TwitterIcon className="twitter--icon" />

            <div onClick={toHome}>
                <SidebarOption
                    active={active === 0}
                    text="Home"
                    Icon={HomeOutlinedIcon}
                />
            </div>
            <div
                onClick={() => {
                    navigate('/search/explore', {
                        state: { search: 'explore', isSearch: true },
                    });
                }}
            >
                <SidebarOption text="Explore" Icon={SearchIcon} />
            </div>
            <NotificationsButton active={active === 3} token={userData.token} />
            <ConversationsButton active={active == 4} token={userData.token} />
            <div
                data-test={HomePageSelectors.PROFILE_BUTTON}
                onClick={toProfile}
            >
                <SidebarOption
                    active={active === 1}
                    text="Profile"
                    Icon={PermIdentityIcon}
                />
            </div>
            <div
                data-test={HomePageSelectors.SETTINGS_BUTTON}
                onClick={() => {
                    navigate('/settings');
                }}
            >
                <SidebarOption
                    text="Settings"
                    Icon={SettingsIcon}
                    active={active == 2}
                />
            </div>
            <Button variant="outlined" className="sidebar--tweet">
                Post
            </Button>

            <div className="account-btn">
                <AccountButton
                    userAvatar={userData.user.avatar}
                    name={userData.user.name}
                    username={userData.user.username}
                    token={userData.token}
                    setIsTherePopUpWindow={setIsTherePopUpWindow}
                />
            </div>
        </div>
    );
}
Sidebar.propTypes = {
    userData: PropTypes.object.isRequired,
    active: PropTypes.number.isRequired,
    setIsTherePopUpWindow: PropTypes.func.isRequired,
};
