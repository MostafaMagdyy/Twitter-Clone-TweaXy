import './FollowingFollowersHeader.css';

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

export default FollowingFollowersHeader;
