import './LoginPage.css';
import EnterUUIDPage from './EnterUUIDPage';
import EnterPasswordPage from './EnterPasswordPage';
import checkUserUUID from '../../apis/checkUserUUID';
import signInWithGoogle from '../../apis/signInWithGoogle';
import SignInErrors from '../../shared/errors/SignInErrors';
import LoginWindowHeader from '../../components/LoginWindowHeader/LoginWindowHeader';
import login from '../../apis/login';
import { setToken, setUser } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import socket from '../../socket';
import PropTypes from 'prop-types';
/**
 * LoginPage component handles the login process, including entering UUID (username or email)
 * and password. It also provides options for signing in with Google, handling forgot password,
 * and navigating to the sign-up page.
 * @param {Object} props - Component props.
 * @param {Function} props.onClose - Function to close the login window.
 * @param {Function} props.openSignUpWindow - Function to open the sign-up window.
 * @returns {JSX.Element} LoginPage component JSX.
 */

const LoginPage = ({ onClose, openSignUpWindow }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [curPage, setCurPage] = useState(0);

    const [formData, setFormData] = useState({
        UUID: '',
        password: '',
    });

    const [UUIDError, setUUIDError] = useState('');
    const [LoginError, setLoginError] = useState('');
    const [LoginWithGoogleError, setLoginWithGoogleError] = useState('');

    const handleUUIDChange = (uuid) => {
        setFormData((prevData) => ({
            ...prevData,
            UUID: uuid,
        }));
        setUUIDError('');
    };

    const handlePasswordChange = (password) => {
        setFormData((prevData) => ({
            ...prevData,
            password: password,
        }));
        setLoginError('');
    };

    const handleUUIDSubmit = async () => {
        if (formData.UUID.trim() === '') {
            setUUIDError('Please enter your phone, email, or username.');
        } else {
            try {
                const result = await checkUserUUID(formData.UUID);

                if (result.status === 'success') {
                    setCurPage(1);
                } else {
                    if (result.message == 'no user found ') {
                        setUUIDError(`${SignInErrors.UNREGISTERED_EMAIL}`);
                    } else {
                        setUUIDError('Please retry enter your UUID');
                    }
                }
            } catch (error) {
                console.error('Error checking user UUID:', error.message);
            }
        }
    };

    const handleLogin = async () => {
        if (formData.password.trim() === '') {
            setUUIDError('Please enter your password.');
        } else {
            try {
                const userData = await login(formData.UUID, formData.password);

                if (userData) {
                    console.log('from login', userData);
                    socket.auth = { token: userData.token };
                    dispatch(setUser(userData.user));
                    dispatch(setToken(userData.token));
                    navigate('/home', { state: { firstTime: false } });
                    onClose();
                } else {
                    setLoginError('user is not found');
                }
            } catch (error) {
                console.error('Error signing in:', error.message);
                setLoginError('Wrong password.');
            }
        }
    };

    const handleLoginWithGoogle = async (token) => {
        try {
            const userData = await signInWithGoogle(token);
            if (userData) {
                console.log('from login', userData);
                dispatch(setUser(userData.user));
                dispatch(setToken(userData.token));
                navigate('/home', { state: { firstTime: false } });
                onClose();
            } else {
                setLoginWithGoogleError('user is not found');
            }
        } catch (error) {
            console.error('Error in handleLoginWithGoogle: ', error.message);
            setLoginWithGoogleError(error.message);
        }
    };

    const handleForgotPassword = () => {
        navigate('forget-password');
    };

    const handleSignUp = () => {
        onClose();
        openSignUpWindow();
    };

    return (
        <div className="login-page-container">
            <LoginWindowHeader onClose={onClose} />
            {curPage === 0 && (
                <EnterUUIDPage
                    UUID={formData.UUID}
                    UUIDError={UUIDError}
                    LoginWithGoogleError={LoginWithGoogleError}
                    handleUUIDChange={handleUUIDChange}
                    handleUUIDSubmit={handleUUIDSubmit}
                    handleForgotPassword={handleForgotPassword}
                    handleLoginWithGoogle={handleLoginWithGoogle}
                    handleSignUp={handleSignUp}
                />
            )}
            {curPage === 1 && (
                <EnterPasswordPage
                    UUID={formData.UUID}
                    password={formData.password}
                    LoginError={LoginError}
                    handlePasswordChange={handlePasswordChange}
                    handleLogin={handleLogin}
                    handleForgotPassword={handleForgotPassword}
                    handleSignUp={handleSignUp}
                />
            )}
        </div>
    );
};
// PropTypes
LoginPage.propTypes = {
    onClose: PropTypes.func.isRequired,
    openSignUpWindow: PropTypes.func.isRequired,
};

export default LoginPage;
