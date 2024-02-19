import './ProfileBio.css';
import { useState } from 'react';
import EditProfilePage from '../../pages/userProfile/EditProfilePage';
import ProfilePageSelectors from '../../shared/selectors/ProfilePage';
import NotifyBox from '../NotifyBox/NotifyBox';
import PropTypes from 'prop-types'; // Import PropTypes

/**
 * EditProfile component for displaying the edit profile button.
 * @param {Object} props - The props for the EditProfile component.
 * @param {Object} props.curuser - Current user data.
 * @param {string} props.token - User authentication token.
 */
export default function EditProfile(props) {
    const [isWindowOpen, setIsWindowOpen] = useState(false);
    const [Message, setMessage] = useState('');
    const openWindow = () => {
        setIsWindowOpen(true);
    };
    const closeWindow = () => {
        setIsWindowOpen(false);
    };
    const actionOccurredHandler = () => {
        setMessage('Info updated Successfully');
        const timeoutId = setTimeout(() => {
            setMessage('');
        }, 2000);
        return () => clearTimeout(timeoutId);
    };
    console.log('edit Profile Button', props.curuser);
    return (
        <>
            <div
                data-test={ProfilePageSelectors.EDIT_PROFILE_BUTTON}
                className="editProfile"
                onClick={openWindow}
            >
                <span>Edit profile</span>
                {Message.length !== 0 && <NotifyBox text={Message} />}
            </div>
            {isWindowOpen && (
                <EditProfilePage
                    curuser={props.curuser}
                    onClose={closeWindow}
                    authToken={props.token}
                    setMessage={actionOccurredHandler}
                />
            )}
        </>
    );
}
// PropTypes
EditProfile.propTypes = {
    curuser: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
};
