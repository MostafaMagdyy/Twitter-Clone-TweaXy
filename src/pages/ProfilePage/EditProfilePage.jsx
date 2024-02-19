import EditProfileWindowHeader from '../../components/userProfile_components/EditProfileWindowHeader';
import { Avatar } from '@mui/material';
import { TextField } from '@mui/material';
import '../userProfile/EditProfilePage.css';
import '../SignUpPage/SignUpPage.css';
import { CameraEnhanceOutlined } from '@mui/icons-material';
import { useState } from 'react';
import updateInfo from '../../apis/updateInfo';
import ProfilePageSelectors from '../../shared/selectors/ProfilePage';
import BirthDate from '../SignUpPage/BirthDate';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/actions';
import getUserDataApi from '../../apis/getProfileData';
import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

/**
 * EditProfilePage component for displaying the edit profile page.
 * @param {Object} props - The props for the EditProfilePage component.
 * @param {Object} props.curuser - Current user data.
 * @param {Function} props.onClose - Function to close the edit profile page.
 * @param {string} props.authToken - User authentication token.
 * @param {Function} props.setMessage - Function to set a message.
 */
export default function EditProfilePage({
    curuser,
    onClose,
    authToken,
    setMessage,
}) {
    const dispatch = useDispatch();
    const [selectedImage, setSelectedImage] = useState(curuser.cover);
    const [ProfileImage, setProfileImage] = useState(curuser.avatar);
    const [TempProfileImage, setTempProfileImage] = useState(null);
    const [TempselectedImage, setTempselectedImage] = useState(null);
    const [ProfileData, changeProfileData] = useState({
        name: curuser.name,
        userbio: curuser.bio,
        location: curuser.location,
        website: curuser.website,
    });
    const dateObj = new Date(curuser.birthdayDate);
    const day = dateObj.getUTCDate().toString();
    const month = (dateObj.getUTCMonth() + 1).toString();
    const year = dateObj.getUTCFullYear().toString();
    const [Data2, changeData2] = useState({
        day: day,
        month: month,
        year: year,
    });
    const fetchData = async () => {
        try {
            const fetchedData = await getUserDataApi({
                id: curuser.id,
                token: authToken,
            });
            console.log('from update', fetchedData.data.user);
            return fetchedData.data.user;
        } catch (error) {
            return false;
        }
    };
    const saveHandler = async () => {
        const res = await updateInfo(
            ProfileData.name,
            Data2,
            ProfileData.userbio,
            TempProfileImage,
            TempselectedImage,
            ProfileData.location,
            authToken
        );
        if (res === true) {
            const res2 = await fetchData();
            if (res2 !== false) dispatch(setUser(res2));
            setMessage();
        }
        onClose();
    };

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        setTempProfileImage(file);
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleBackgroundchange = (event) => {
        const file = event.target.files[0];
        setTempselectedImage(file);
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const ProfileData_Handler = (evt) => {
        const changedelement = evt.target.name;
        const newvalue = evt.target.value;
        changeProfileData((cur) => {
            cur[changedelement] = newvalue;
            return { ...cur };
        });
    };
    const Data2_Handler = (evt) => {
        const changedelement = evt.target.name;
        const newvalue = evt.target.value;
        changeData2((cur) => {
            cur[changedelement] = newvalue;
            return { ...cur };
        });
    };

    return (
        <>
            <div className="edit-profile-page-container">
                <div className="temp">
                    <EditProfileWindowHeader
                        onClose={onClose}
                        saveHandler={saveHandler}
                    />

                    <div className="edit-profile-page-body">
                        <div>
                            <div className="background-image">
                                <img
                                    width={' 590px'}
                                    className="image-position"
                                    src={
                                        TempselectedImage === null
                                            ? `https://tweaxybackend.mywire.org/api/v1/images/${selectedImage}`
                                            : selectedImage
                                    }
                                />
                                <label
                                    htmlFor="background-upload"
                                    className="image-upload-2"
                                >
                                    <CameraEnhanceOutlined />
                                </label>
                                <input
                                    type="file"
                                    id="background-upload"
                                    className="image-upload"
                                    onChange={handleBackgroundchange}
                                />
                                <div className="profile-image">
                                    <Avatar
                                        sx={{ width: 100, height: 100 }}
                                        src={
                                            TempProfileImage === null
                                                ? `https://tweaxybackend.mywire.org/api/v1/images/${ProfileImage}`
                                                : ProfileImage
                                        }
                                    />
                                    <label
                                        htmlFor="avatar-upload"
                                        className="profile-upload-2"
                                    >
                                        <CameraEnhanceOutlined />
                                    </label>
                                    <input
                                        type="file"
                                        id="avatar-upload"
                                        className="profile-upload"
                                        onChange={handleAvatarChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="edit-profile-uuid-field">
                            <TextField
                                data-test={ProfilePageSelectors.NAME_FIELD}
                                className="edit-profile-uuid-field"
                                variant="outlined"
                                id="outlined-basic"
                                label="Name"
                                name="name"
                                value={ProfileData.name}
                                onChange={ProfileData_Handler}
                            />
                        </div>
                        <div className="edit-profile-uuid-field">
                            <TextField
                                data-test={ProfilePageSelectors.BIO_FIELD}
                                className="edit-profile-uuid-field"
                                id="outlined-multiline-flexible"
                                multiline
                                rows={3}
                                label="Bio"
                                name="userbio"
                                value={
                                    ProfileData.userbio === 'null'
                                        ? ''
                                        : ProfileData.userbio
                                }
                                onChange={ProfileData_Handler}
                            />
                        </div>

                        <div className="edit-profile-uuid-field">
                            <TextField
                                data-test={ProfilePageSelectors.LOCATION_FIELD}
                                className="edit-profile-uuid-field"
                                variant="outlined"
                                id="outlined-basic"
                                label="Location"
                                name="location"
                                value={
                                    ProfileData.location === 'null'
                                        ? ''
                                        : ProfileData.location
                                }
                                onChange={ProfileData_Handler}
                            />
                        </div>
                        <span className="date-birth-text">Date of Birth</span>
                        <BirthDate
                            Data2={Data2}
                            Data2_Handler={Data2_Handler}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
// PropTypes
EditProfilePage.propTypes = {
    curuser: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    authToken: PropTypes.string.isRequired,
    setMessage: PropTypes.func.isRequired,
};
