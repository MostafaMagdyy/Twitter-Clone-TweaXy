import "./LoginWindowHeader.css";

const LoginWindowHeader = ({ onClose }) => (
  <div className="login-window-header">
    <button className="login-window-header-close-button" onClick={onClose}>
      &times;
    </button>
    <img src="../../../assets/logo2.ico" alt="TweaXy Logo" />
  </div>
);

export default LoginWindowHeader;
