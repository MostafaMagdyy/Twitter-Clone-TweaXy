import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import '../../components/LoginWindowHeader/LoginWindowHeader.css';
import SignUpPage1 from './SignUpPage1';
import SignUpPage3 from './SignUpPage3';
import SignUpPage4 from './SignUpPage4';
import SignUpPage5 from './SignUpPage5';
import { sendEmailVerification } from '../../apis/EmailVerfication';
import signup from '../../apis/Signup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSocket, setToken, setUser } from '../../redux/actions';
import socket from '../../socket';
const Errors = {
    Email: '',
    Username: '',
    Password:
        'Password must contain 8 or more characters with at least one of: uppercase, lowercase, number and special',
    Verficationcode: '',
    Signup: '',
    Name: 'Name must be at least 4 characters',
};
const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
/**
 * Component for user signup.
 * @component
 * @param {object} props - The props object.
 * @param {function} props.onClose - The function to close the signup window.
 * @returns {JSX.Element} - The rendered component.
 * @example
 * ```jsx
 * <SignUpPage onClose={handleClose} />
 * ```
 */
const SignUpPage = ({ onClose }) => {
    const [windowOpened, setwindowOpned] = useState(0);
    const [Data1, changeData1] = useState({
        username: '',
        usermail: '',
        name: '',
    });
    const [Data2, changeData2] = useState({ day: '', month: '', year: '' });
    const [password, setpassword] = useState('');
    const [canbeuser, setcanbeuser] = useState(true);
    const [verficationcode, setverficationcode] = useState('');
    const [captchaVal, setCaptchaVal] = useState('');
    const captchaRef = useRef(null);
    const [iscomplete, setiscomplete] = useState(false);
    const captchaApiHandler = () => {
        setCaptchaVal(captchaRef.current.getValue());
        setiscomplete(true);
    };
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const nextWindowHandler = async () => {
        if (windowOpened === 2) {
            sendEmailVerification(Data1.usermail);
        }
        if (windowOpened === 4) {
            try {
                const userData = await signup(
                    Data1.usermail,
                    Data1.username,
                    Data2,
                    password,
                    verficationcode,
                    captchaVal,
                    setcanbeuser,
                    canbeuser,
                    setwindowOpned,
                    windowOpened
                );
                socket.auth = { token: userData.token };
                dispatch(setSocket(socket));
                dispatch(setUser(userData.user));
                dispatch(setToken(userData.token));
                navigate(`/home`, { state: { firstTime: true } });
            } catch {
                (err) => {
                    console.log('error signing up:', err.message);
                };
            }
        }
        if (windowOpened < 4) setwindowOpned(windowOpened + 1);
    };
    const passwordhandler = (ev) => {
        setpassword(ev.target.value);
        // setcanrender(true);
    };
    const handlewindowsnav = () => {
        if (windowOpened === 0) onClose();
        else setwindowOpned(windowOpened - 1);
    };
    const EditInformation = () => {
        setwindowOpned(windowOpened - 1);
    };

    return (
        <div className="sign-up-page-container">
            <div className="login-window-header">
                <button
                    className="login-window-header-close-button"
                    onClick={handlewindowsnav}
                >
                    {windowOpened === 0 ? 'x' : '←'}
                </button>
                <img src="../../../assets/logo2.ico" alt="TweaXy Logo" />
            </div>
            {windowOpened === 0 && (
                <SignUpPage1
                    nextWindowHandler={nextWindowHandler}
                    Data1={Data1}
                    changeData1={changeData1}
                    Data2={Data2}
                    changeData2={changeData2}
                />
            )}
            {windowOpened === 1 && (
                <SignUpPage3
                    Data1={Data1}
                    Data2={Data2}
                    EditInformation={EditInformation}
                    nextWindowHandler={nextWindowHandler}
                />
            )}
            {windowOpened === 2 && (
                <div className="sign-up-page-body">
                    <ReCAPTCHA
                        sitekey="6Le61wEpAAAAAGgZRq-B51uGQpEP3J4_YIUDCU-o"
                        onChange={captchaApiHandler}
                        ref={captchaRef}
                    />

                    <button
                        className="black-wide-button"
                        style={{
                            background: iscomplete ? 'black' : 'gray',
                            marginTop: '170px',
                            marginBottom: '-140px',
                        }}
                        disabled={!iscomplete}
                        onClick={nextWindowHandler}
                    >
                        Next
                    </button>
                </div>
            )}
            {windowOpened === 3 && (
                <SignUpPage4
                    verficationcode={verficationcode}
                    setverficationcode={setverficationcode}
                    Data1={Data1}
                    nextWindowHandler={nextWindowHandler}
                />
            )}
            {windowOpened === 4 && (
                <SignUpPage5
                    canbeuser={canbeuser}
                    password={password}
                    passwordhandler={passwordhandler}
                    nextWindowHandler={nextWindowHandler}
                />
            )}
        </div>
    );
};
/**
 * PropTypes for the SignUpPage component.
 * @type {Object}
 */
SignUpPage.propTypes = {
    /**
     * The function to close the signup window.
     * @type {Function}
     */
    onClose: PropTypes.func.isRequired,
};

export { SignUpPage as default, Errors, months };
