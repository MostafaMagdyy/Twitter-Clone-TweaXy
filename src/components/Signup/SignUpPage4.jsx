import { TextField } from '@mui/material';
import './SignUpPage.css';
import './SignUpHome.css';
import React from 'react';
import { useState, useEffect } from 'react';
import {
    sendEmailVerification,
    checkEmailVerification,
} from '../../apis/EmailVerfication';
import { Errors } from './SignUpPage';
import SignUpSelectors from '../../shared/selectors/SignUp';
import PropTypes from 'prop-types';
/**
 * Component for the fourth step of the signup process.
 * @param {Object} props - The props object.
 * @param {string} props.verficationcode - The verification code.
 * @param {Function} props.setverficationcode - Function to set the verification code.
 * @param {Object} props.Data1 - State object for data related to previous steps (username and email).
 * @param {Function} props.nextWindowHandler - Function to handle moving to the next step.
 * @returns {JSX.Element} - The rendered component.
 */
const SignUpPage4 = ({
    verficationcode,
    setverficationcode,
    Data1,
    nextWindowHandler,
}) => {
    const [iscompleteverficationcode, setiscompleteverficationcode] =
        useState(false);
    const [isokverficationcode, setisokverficationcode] = useState(true);
    const verficationcodehandler = (ev) => {
        setverficationcode(ev.target.value);
    };
    useEffect(
        function checkverficationcode() {
            const verficationcodeok = verficationcode.length === 8;
            setiscompleteverficationcode(verficationcodeok);
        },
        [verficationcode]
    );
    const onclickHandler = () => {
        checkEmailVerification(
            Data1.usermail,
            verficationcode,
            setisokverficationcode,
            nextWindowHandler
        );
    };
    const resendHandler = () => {
        sendEmailVerification(Data1.usermail);
    };
    const p3 = 'Step 4 of 5';
    return (
        <div className="sign-up-page-body">
            <h1>We've sent you a verification code</h1>
            <p>Enter it below to verfiy {Data1.usermail}</p>
            <div className="sign-up-uuid-field" style={{ width: '438px' }}>
                <TextField
                    className="sign-up-uuid-field"
                    variant="outlined"
                    id="outlined-basic"
                    label="verification code"
                    data-test={SignUpSelectors.VERIFICATION_CODE_FIELD}
                    value={verficationcode}
                    onChange={verficationcodehandler}
                    style={{ width: '438px' }}
                />
            </div>
            {!isokverficationcode && (
                <p className="error-message"> {Errors['Verficationcode']}</p>
            )}
            <a
                onClick={resendHandler}
                style={{ fontFamily: 'Arial', fontWeight: 'inherit' }}
            >
                Didn't receive mail?
            </a>
            <button
                data-test={SignUpSelectors.NEXT_BUTTON}
                className="Hp-black-wide-button"
                disabled={!iscompleteverficationcode}
                style={{
                    background: iscompleteverficationcode ? 'black' : 'gray',
                }}
                onClick={onclickHandler}
            >
                Next
            </button>
        </div>
    );
};
// PropTypes documentation
SignUpPage4.propTypes = {
    verficationcode: PropTypes.string.isRequired,
    setverficationcode: PropTypes.func.isRequired,
    Data1: PropTypes.object.isRequired,
    nextWindowHandler: PropTypes.func.isRequired,
};

export default SignUpPage4;
