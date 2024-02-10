let CaptchaUrl = 'http://tweaxybackend.mywire.org/api/v1/auth/captcha';

const captchaApi = (captcha) => {
    fetch(CaptchaUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        
        },
        body: JSON.stringify({
            captcha
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Response from the API:', data);
            if (data.status === 'success') {
            } else {
                console.log(data.message);
            }
        })
        .catch((error) => {console.log(error)});
};
export default captchaApi;
