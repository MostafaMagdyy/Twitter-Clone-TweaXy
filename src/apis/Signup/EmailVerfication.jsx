import { Errors } from "../pages/SignUpPage/SignUpPage";

let emailVerficationUrl =
  "http://tweaxybackend.mywire.org/api/v1/auth/sendEmailVerification";
let checkEmailVerificationUrl =
  "http://tweaxybackend.mywire.org/api/v1/auth/checkEmailVerification";
const sendEmailVerification = (usermail) => {
  fetch(emailVerficationUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: usermail }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Response from the API:", data);
      if (data.status === "success") {
      } else {
        // to continue -resend him another token
      }
    })
    .catch((error) => {
      //manga
    });
};
const checkEmailVerification = (
  usermail,
  token,
  setisokverficationcode,
  nextWindowHandler
) => {
  let urlWithPathParams = `${checkEmailVerificationUrl}/${encodeURIComponent(
    usermail
  )}/${encodeURIComponent(token)}`;
  fetch(urlWithPathParams)
    .then((response) => response.json())
    .then((data) => {
      console.log("Response from the API:", data);
      if (data.status === "success") {
        setisokverficationcode(true);
        nextWindowHandler();
      } else {
        Errors["Verficationcode"] = data.message;
        setisokverficationcode(false);
        console.log(Errors["Verficationcode"]);
      }
    })
    .catch((error) => {
      Errors["Verficationcode"] = data.message;
    });
};
export { sendEmailVerification, checkEmailVerification };
