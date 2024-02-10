import { useState } from 'react';
import React from 'react';
import LoginWindowHeader from '../../components/LoginWindowHeader/LoginWindowHeader';
import SignUpPageuserName from './SignUpPageUName';
import SignUpPageAvater from './SignUpPageAvater';
const SignUpHome = ({ onClose, UN, token, user }) => {
    const [window, setwidnow] = useState(0);
    const next_Handler = () => {
        if (window === 1) onClose();
        else setwidnow(window + 1);
    };
    return (
        <>
            <div className="sign-up-page-container">
                <LoginWindowHeader onClose={onClose} />
                {window === 0 && (
                    <SignUpPageuserName
                        next_Handler={next_Handler}
                        UN={UN}
                        token={token}
                        user={user}
                    />
                )}
                {window === 1 && (
                    <SignUpPageAvater
                        next_Handler={next_Handler}
                        token={token}
                        user={user}
                    />
                )}
            </div>
        </>
    );
};
export default SignUpHome;
