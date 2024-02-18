import { useState, useEffect } from 'react';
import React from 'react';
import './SignUpPage.css';
import './SignUpHome.css';
import { MenuItem, TextField } from '@mui/material';
import { isUniqeEmail, isUniqueUsername } from '../../apis/Email';
import { Errors } from './SignUpPage';
import SignUpSelectors from '../../shared/selectors/SignUp';
import BirthDate from './BirthDate';
const date = 'Date of birth';
const create = 'Create your account';
import PropTypes from 'prop-types';
/**
 * Component for the first step of the signup process.
 * @param {Object} props - The props object.
 * @param {Function} props.nextWindowHandler - Function to handle moving to the next step.
 * @param {Object} props.Data1 - State object for data related to step 1 (username and email).
 * @param {Function} props.changeData1 - Function to update state for step 1 data.
 * @param {Object} props.Data2 - State object for data related to step 2 (birth date).
 * @param {Function} props.changeData2 - Function to update state for step 2 data.
 * @returns {JSX.Element} - The rendered component.
 */
const SignUpPage1 = ({
    nextWindowHandler,
    Data1,
    changeData1,
    Data2,
    changeData2,
}) => {
    const [iscomplete, setiscomplete] = useState(false);
    const [uniqueEmail, setuniqueEmail] = useState(true);
    useEffect(
        function checkEmailUniqness() {
            if (Data1.usermail.length > 0) {
                isUniqeEmail(Data1.usermail, setuniqueEmail);
            } else setuniqueEmail(true);
        },
        [Data1.usermail]
    );
    useEffect(
        function Check_Information() {
            const isdata1ok = Data1.username.length > 3 && Data1.usermail;
            const isdata2ok = Data2.day && Data2.month && Data2.year;
            setiscomplete(
                isdata1ok &&
                    isdata2ok &&
                    uniqueEmail &&
                    Data1.username.length > 3
            );
        },
        [Data1, Data2]
    );
    const Data1_Handler = (evt) => {
        const changedelement = evt.target.name;
        const newvalue = evt.target.value;
        changeData1((cur) => {
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
        <div className="sign-up-page-body">
            {/* <p>{p3}</p> */}
            <h1>{create}</h1>
            <div className="sign-up-uuid-field">
                <TextField
                    className="sign-up-uuid-field"
                    variant="outlined"
                    id="outlined-basic"
                    name="username"
                    label="Name"
                    data-test={SignUpSelectors.NAME_FIELD}
                    value={Data1.username}
                    onChange={Data1_Handler}
                />
            </div>
            {Data1.username.length > 0 && Data1.username.length < 4 && (
                <p className="error-message">{Errors['Name']}</p>
            )}
            <div className="sign-up-uuid-field">
                <TextField
                    className="sign-up-uuid-field"
                    variant="outlined"
                    id="outlined-basic"
                    name="usermail"
                    label="Email"
                    data-test={SignUpSelectors.EMAIL_FIELD}
                    value={Data1.usermail}
                    onChange={Data1_Handler}
                />
            </div>
            {!uniqueEmail && <p className="error-message">{Errors['Email']}</p>}
            <span className="sign-up-span">{date}</span>
            <BirthDate Data2={Data2} Data2_Handler={Data2_Handler} />
            <button
                onClick={nextWindowHandler}
                className="Hp-black-wide-button"
                type="submit"
                data-test={SignUpSelectors.NEXT_BUTTON}
                disabled={!iscomplete}
                style={{
                    background: iscomplete ? 'black' : 'gray',
                }}
            >
                Next
            </button>
        </div>
    );
};
// PropTypes documentation
SignUpPage1.propTypes = {
    nextWindowHandler: PropTypes.func.isRequired,
    Data1: PropTypes.shape({
        username: PropTypes.string.isRequired,
        usermail: PropTypes.string.isRequired,
    }).isRequired,
    changeData1: PropTypes.func.isRequired,
    Data2: PropTypes.shape({
        day: PropTypes.number.isRequired,
        month: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
    }).isRequired,
    changeData2: PropTypes.func.isRequired,
};

export default SignUpPage1;
