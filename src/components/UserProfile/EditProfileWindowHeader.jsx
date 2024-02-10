import ProfilePageSelectors from '../../shared/selectors/ProfilePage';
import './EditProfileWindowHeader.css';

const EditProfileWindowHeader = ({ onClose, saveHandler }) => (
    <div className="EditProfile-window-header">
        <button
            className="EditProfile-window-header-close-button"
            onClick={onClose}
        >
            &times;
        </button>
        <span className="edit-text">Edit profile</span>
        <button data-test={ProfilePageSelectors.SAVE_BUTTON} className="save-button" onClick={saveHandler}>Save</button>


    </div>
);

export default EditProfileWindowHeader;
