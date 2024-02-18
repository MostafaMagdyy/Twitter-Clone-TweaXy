import { TextField } from '@mui/material';
import './SignUpPage.css';
import './SignUpHome.css';
import React from 'react';
import SignUpSelectors from '../../shared/selectors/SignUp';
import { months } from './SignUpPage';
const create = 'Create your account';
import PropTypes from 'prop-types';
/**
 * Component for the third step of the signup process.
 * @param {Object} props - The props object.
 * @param {Object} props.Data1 - State object for data related to previous steps (username and email).
 * @param {Object} props.Data2 - State object for data related to step 2 (birth date).
 * @param {Function} props.EditInformation - Function to handle editing information.
 * @param {Function} props.nextWindowHandler - Function to handle moving to the next step.
 * @returns {JSX.Element} - The rendered component.
 */
const SignUpPage3 = ({ Data1, Data2, EditInformation, nextWindowHandler }) => {
    const dateval =
        months[Data2.month - 1] + ' ' + Data2.day + ',' + Data2.year;
    return (
        <div className="sign-up-page-body">
            <h1>{create}</h1>
            <div className="sign-up-uuid-field">
                <TextField
                    className="sign-up-uuid-field"
                    variant="outlined"
                    id="outlined-basic"
                    name="username"
                    label="Name"
                    data-test={SignUpSelectors.CONFIRM_NAME_FIELD}
                    value={Data1.username}
                    onClick={EditInformation}
                />
            </div>
            <div className="sign-up-uuid-field">
                <TextField
                    className="sign-up-uuid-field"
                    variant="outlined"
                    id="outlined-basic"
                    name="usermail"
                    label="Email"
                    data-test={SignUpSelectors.CONFIRM_EMAIL_FIELD}
                    value={Data1.usermail}
                    onClick={EditInformation}
                />
            </div>
            <div className="sign-up-uuid-field">
                <TextField
                    className="sign-up-uuid-field"
                    variant="outlined"
                    id="outlined-basic"
                    label="Date"
                    data-test={SignUpSelectors.CONFIRM_BIRTH_DATE_FIELD}
                    value={dateval}
                    onClick={EditInformation}
                />
            </div>
            <button
                className="Hp-black-wide-button"
                onClick={nextWindowHandler}
                data-test={SignUpSelectors.NEXT_BUTTON}
            >
                Next
            </button>
        </div>
    );
};
// PropTypes documentation
SignUpPage3.propTypes = {
    Data1: PropTypes.shape({
        username: PropTypes.string.isRequired,
        usermail: PropTypes.string.isRequired,
    }).isRequired,
    Data2: PropTypes.shape({
        day: PropTypes.number.isRequired,
        month: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
    }).isRequired,
    EditInformation: PropTypes.func.isRequired,
    nextWindowHandler: PropTypes.func.isRequired,
};

export default SignUpPage3;
