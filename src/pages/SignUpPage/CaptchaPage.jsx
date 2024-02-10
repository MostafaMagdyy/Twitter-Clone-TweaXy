import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import './SignUpPage.css';
import { useRef, useState } from 'react';

const CaptchaPage = ({ nextWindowHandler }) => {
    const p3 = 'Step 3 of 5';
    const captchaRef = useRef(null);
    const [iscomplete, setiscomplete] = useState(false);
    const captchaApiHandler = () => {
        setiscomplete(true);
    };

    return (
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
    );
};

export default CaptchaPage;
