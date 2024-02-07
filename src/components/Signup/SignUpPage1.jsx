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
export default SignUpPage1;
