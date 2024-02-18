import { useState, React } from 'react';
import './SignUpHome.css';
import Pictureupload from '../../apis/Pictureupload';
import './Avater.css';
import img from '../../../assets/default.jpeg';
const UN = 'Pick a profile picture';
const uniq = 'Have a favorite selfie? Upload it now.';
import NotifyBox from '../../components/NotifyBox/NotifyBox';
import { setUser } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import getUserDataApi from '../../apis/getProfileData';
import PropTypes from 'prop-types';
/**
 * Component for selecting and uploading a profile picture during sign up.
 * @param {Object} props - The props object.
 * @param {Function} props.next_Handler - Function to handle moving to the next step.
 * @param {string} props.token - The user's authentication token.
 * @param {Object} props.user - The user object.
 * @returns {JSX.Element} - The rendered component.
 */
const SignUpPageAvater = ({ next_Handler, token, user }) => {
    const [avatar, setavatar] = useState(img);
    const [SentImage, setSentImage] = useState(null);
    const [Message, setMessage] = useState('');
    const dispatch = useDispatch();
    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        setSentImage(file);
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setavatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const actionOccurredHandler = (message) => {
        setMessage(message);
        const timeoutId = setTimeout(() => {
            setMessage('');
        }, 3000);
        return () => clearTimeout(timeoutId);
    };
    const handleRemoveAvatar = () => {
        setavatar(null);
    };
    const fetchData = async () => {
        try {
            const fetchedData = await getUserDataApi({
                id: user.id,
                token: token,
            });
            return fetchedData.data.user;
        } catch (error) {
            console.log('Failed With Error', error.message);
            return false;
        }
    };
    const updatepicture = async () => {
        const res = await Pictureupload(SentImage, token);
        if (res == true) {
            console.log('Avatar Updated Successfully');
            actionOccurredHandler('Avatar added Successfully');
            const res2 = await fetchData();
            if (res2 !== false) dispatch(setUser(res2));
            setTimeout(() => {
                next_Handler();
            }, 500);
        } else next_Handler();
    };
    return (
        <>
            <div className="sign-up-homepage-body">
                <h1>{UN}</h1>
                <p>{uniq}</p>
                <div className="avatar-input">
                    {avatar ? (
                        <div className="avatar-preview">
                            <img
                                src={avatar}
                                alt="User Avatar"
                                className="avatar-img"
                            />
                            <div className="avatar-actions">
                                <button onClick={handleRemoveAvatar}></button>
                                <button onClick={handleRemoveAvatar}></button>
                            </div>
                        </div>
                    ) : (
                        <div className="avatar-upload">
                            <label
                                htmlFor="avatarInput"
                                className="avatar-label"
                            >
                                Choose your profile picture
                            </label>
                            <input
                                type="file"
                                id="avatarInput"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="avatar-input-field"
                            />
                        </div>
                    )}
                </div>
                <button
                    className="Hp-black-wide-button"
                    type="submit"
                    onClick={updatepicture}
                >
                    Next
                </button>
                {Message.length !== 0 && <NotifyBox text={Message} />}
            </div>
        </>
    );
};
// PropTypes documentation
SignUpPageAvater.propTypes = {
    next_Handler: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
};
export default SignUpPageAvater;
