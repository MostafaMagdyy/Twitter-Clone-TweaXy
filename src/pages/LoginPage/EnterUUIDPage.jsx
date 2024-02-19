import './LoginPage.css';
import { TextField } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import SignInSelectors from '../../shared/selectors/SignIn';
import LoginOrSpan from '../../components/LoginOrSpan/LoginOrSpan';
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component for rendering the page where users enter their UUID (phone, email, or username) to login.
 * @param {object} props - The props for the EnterUUIDPage component.
 * @param {string} props.UUID - The UUID (phone, email, or username) entered by the user.
 * @param {string} props.UUIDError - Error message for UUID input validation.
 * @param {string} props.LoginWithGoogleError - Error message for Google login.
 * @param {Function} props.handleUUIDChange - Function to handle changes in UUID input.
 * @param {Function} props.handleUUIDSubmit - Function to handle UUID submission.
 * @param {Function} props.handleForgotPassword - Function to handle clicking on "Forgot password?".
 * @param {Function} props.handleLoginWithGoogle - Function to handle Google login.
 * @param {Function} props.handleSignUp - Function to handle clicking on "Sign up".
 */
const EnterUUIDPage = ({
    UUID,
    UUIDError,
    LoginWithGoogleError,
    handleUUIDChange,
    handleUUIDSubmit,
    handleForgotPassword,
    handleLoginWithGoogle,
    handleSignUp,
}) => {
    return (
        <div className="login-page-body">
            <h1>Login to TweaXy</h1>
            <div className="Google-login">
                <GoogleLogin
                    size="large"
                    shape="pill"
                    width="300px"
                    type="standard"
                    text="signin_with"
                    theme="filled_black"
                    logo_alignment="left"
                    onSuccess={(response) => handleLoginWithGoogle(response)}
                />
            </div>
            {LoginWithGoogleError && (
                <p className="error-message">{LoginWithGoogleError}</p>
            )}
            <LoginOrSpan />
            <TextField
                variant="outlined"
                id="outlined-basic"
                className="login-uuid-field"
                label="Phone, email, or username"
                data-test={SignInSelectors.EMAIL_FIELD}
                value={UUID}
                onChange={(e) => handleUUIDChange(e.target.value)}
            />
            {UUIDError && <p className="error-message">{UUIDError}</p>}
            <button
                data-test={SignInSelectors.NEXT_BUTTON}
                className="black-button"
                disabled={UUID === ''}
                onClick={handleUUIDSubmit}
            >
                Next
            </button>
            <button
                data-test={SignInSelectors.FORGET_PASSWORD_BUTTON}
                className="white-button"
                onClick={handleForgotPassword}
            >
                Forgot password?
            </button>
            <p>
                Don't have an account? <a onClick={handleSignUp}>Sign up</a>
            </p>
        </div>
    );
};
// PropTypes
EnterUUIDPage.propTypes = {
    UUID: PropTypes.string.isRequired,
    UUIDError: PropTypes.string,
    LoginWithGoogleError: PropTypes.string,
    handleUUIDChange: PropTypes.func.isRequired,
    handleUUIDSubmit: PropTypes.func.isRequired,
    handleForgotPassword: PropTypes.func.isRequired,
    handleLoginWithGoogle: PropTypes.func.isRequired,
    handleSignUp: PropTypes.func.isRequired,
};
export default EnterUUIDPage;
