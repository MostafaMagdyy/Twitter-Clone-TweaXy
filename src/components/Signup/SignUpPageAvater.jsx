import { useState } from 'react';
import './SignUpHome.css';
import Pictureupload from '../../apis/Pictureupload';
import './Avater.css';
import img from '../../../assets/default.jpeg';
import { useDispatch } from 'react-redux';
const UN = 'Pick a profile picture';
const uniq = 'Have a favorite selfie? Upload it now.';
import { setUser } from '../../redux/actions';
import NotifyBox from '../../components/NotifyBox/NotifyBox';
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
    const updatepicture = async () => {
        const res = await Pictureupload(SentImage, token);
        if (res == true) {
            console.log('Avatar Updated Successfully');
            actionOccurredHandler('Avatar added Successfully');
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
export default SignUpPageAvater;
