import './NotifyBox.css';

const NotifyBox = ({ text }) => {
    return (
        <div className="notify-box-msg">
            <div className="msg-container">{text}</div>
        </div>
    );
};

export default NotifyBox;
