import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './LoginPage.css';
import SignInSelectors from '../../shared/selectors/SignIn';
import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

/**
 * Component for rendering the page where users enter their password to login.
 * @param {object} props - The props for the EnterPasswordPage component.
 * @param {string} props.UUID - The UUID of the user.
 * @param {string} props.password - The password entered by the user.
 * @param {string} props.LoginError - Error message for login validation.
 * @param {Function} props.handlePasswordChange - Function to handle changes in the password input.
 * @param {Function} props.handleLogin - Function to handle login.
 * @param {Function} props.handleForgotPassword - Function to handle clicking on "Forgot password?".
 * @param {Function} props.handleSignUp - Function to handle clicking on "Sign up".
 */
const EnterPasswordPage = ({
    UUID,
    password,
    LoginError,
    handlePasswordChange,
    handleLogin,
    handleForgotPassword,
    handleSignUp,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div className="login-page-body">
            <h1>Enter your password</h1>
            <TextField
                id="outlined-disabled"
                label="UUID"
                value={UUID}
                disabled
                InputProps={{
                    style: {
                        background: '#d8eaf8ed',
                    },
                }}
                sx={{
                    m: 1,
                    width: '100%',
                    maxWidth: '440px',
                    height: '80px',
                }}
                variant="outlined"
            />
            <FormControl className="password-form-control" variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                    Password
                </InputLabel>
                <OutlinedInput
                    data-test={SignInSelectors.PASSWORD_FIELD}
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? (
                                    <VisibilityOff />
                                ) : (
                                    <Visibility />
                                )}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>
            {LoginError && <p className="error-message">{LoginError}</p>}
            <button
                data-test={SignInSelectors.NEXT_BUTTON}
                className="black-wide-button"
                disabled={password === ''}
                onClick={handleLogin}
            >
                Login
            </button>
            <button
                data-test={SignInSelectors.FORGET_PASSWORD_BUTTON}
                className="white-wide-button"
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
EnterPasswordPage.propTypes = {
    UUID: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    LoginError: PropTypes.string,
    handlePasswordChange: PropTypes.func.isRequired,
    handleLogin: PropTypes.func.isRequired,
    handleForgotPassword: PropTypes.func.isRequired,
    handleSignUp: PropTypes.func.isRequired,
};
export default EnterPasswordPage;
