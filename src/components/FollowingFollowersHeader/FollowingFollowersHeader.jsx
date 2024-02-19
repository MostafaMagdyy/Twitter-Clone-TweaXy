import './FollowingFollowersHeader.css';
import React from 'react';
import PropTypes from 'prop-types';

/**
 *
 * @param {object} props - Component props.
 * @param {string} props.name - Name of the user.
 * @param {string} props.username - Username of the user.
 * @param {number} props.curPage - Current active page index.
 * @param {function} props.setCurPage - Function to set the current page.
 * @param {function} props.navigateBack - Function to navigate back.
 * @returns {JSX.Element} - FollowingFollowersHeader component.
 */
const FollowingFollowersHeader = ({
    name,
    username,
    curPage,
    setCurPage,
    navigateBack,
}) => {
    return (
        <div className="following-followers-header-container">
            <div className="following-followers-header-user-info">
                <button
                    className="following-followers-header-go-back-btn"
                    onClick={navigateBack}
                >
                    🡠
                </button>
                <div className="following-followers-header-name-username-container">
                    <span className="following-followers-header-name">
                        {name}
                    </span>
                    <span className="following-followers-header-username">
                        {`@${username}`}
                    </span>
                </div>
            </div>
            <div className="following-followers-header-navigator">
                <div
                    className="following-followers-header-nav-element-container"
                    onClick={() => setCurPage(0)}
                >
                    <span className={`${curPage == 0 && 'active-nav-element'}`}>
                        Followers
                    </span>
                </div>
                <div
                    className="following-followers-header-nav-element-container"
                    onClick={() => setCurPage(1)}
                >
                    <span className={`${curPage == 1 && 'active-nav-element'}`}>
                        Following
                    </span>
                </div>
            </div>
        </div>
    );
};

FollowingFollowersHeader.propTypes = {
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    curPage: PropTypes.number.isRequired,
    setCurPage: PropTypes.func.isRequired,
    navigateBack: PropTypes.func.isRequired,
};

export default FollowingFollowersHeader;
