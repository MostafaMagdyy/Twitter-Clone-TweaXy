import './LoginPage.css';
import { TextField } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import SignInSelectors from '../../shared/selectors/SignIn';
import LoginOrSpan from '../../components/LoginOrSpan/LoginOrSpan';
import React from 'react';
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
export default EnterUUIDPage;
