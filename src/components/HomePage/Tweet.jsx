import { useState, useEffect, useRef } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './Tweet.css';
import MediaChecker from './MediaChecker';
import { apiLikeTweet, apiDislikeTweet } from '../../apis/tweetApis/LikeTweet';
import Avatar from '@mui/material/Avatar';
import './Avatar.css';
import { useNavigate } from 'react-router-dom';
import TweetDate from '../../utils/TweetDate';
import { TweetOptionsPopDown } from './TweetOptionsPopDown';
import { apiAddReply } from '../../apis/tweetApis/AddReply';
import AddReplyWindow from './AddReplyWindow';
import { hashText } from '../../shared/Utils';
import TweetSelectors from '../../shared/selectors/Tweets';
import { apiRepost, apiDeleteRepost } from '../../apis/tweetApis/repostTweet';

export default function Tweet({
    tweet,
    removeTweet,
    handleTweetsFiltering,
    token,
    followedByMe,
    isCurrentUserTweet,
}) {
    const avatar = tweet.mainInteraction.user.avatar;
    const username = tweet.mainInteraction.user.name;
    const handle = tweet.mainInteraction.user.username;
    const uploadTime = tweet.mainInteraction.createdDate;
    const tweetText = tweet.mainInteraction.text;
    const tweetMedia = tweet.mainInteraction.media;
    const replies = tweet.mainInteraction.commentsCount;
    const reposts = tweet.mainInteraction.retweetsCount;
    const likes = tweet.mainInteraction.likesCount;
    const insights = tweet.mainInteraction.viewsCount;
    const tweetId = tweet.mainInteraction.id;
    const isUserLiked = tweet.mainInteraction.isUserInteract.isUserLiked;
    const userID = tweet.mainInteraction.user.id;
    const isUserInteract = tweet.mainInteraction.isUserInteract;
    const [tweetLikes, setTweetLikes] = useState(likes);
    const [tweetReplies, setTweetReplies] = useState(replies);
    const [tweetReposts, setTweetReposts] = useState(reposts);
    const [tweetInsights, setTweetInsights] = useState(insights);
    const [isLikeActive, setLikeActive] = useState(isUserLiked);
    const [isrepostActive, setRepostActive] = useState(
        isUserInteract.isUserRetweeted
    );
    const activityIcon1 = useRef(null);
    const activityIcon2 = useRef(null);
    const activityIcon3 = useRef(null);
    const activityIcon4 = useRef(null);
    const iconInteraction1 = useRef(null);
    const iconInteraction2 = useRef(null);
    const iconInteraction3 = useRef(null);
    const iconInteraction4 = useRef(null);
    const navigate = useNavigate();
    console.log('from tweet', isrepostActive);
    const profileRouting = (event) => {
        navigate(`/profile/${handle}`, {
            state: { userID: userID },
        });
        event.stopPropagation();
    };

    useEffect(() => {
        const activityIcons = [
            activityIcon1.current,
            activityIcon2.current,
            activityIcon3.current,
            activityIcon4.current,
        ];
        const iconInteractions = [
            iconInteraction1.current,
            iconInteraction2.current,
            iconInteraction3.current,
            iconInteraction4.current,
        ]; // Added a dot before 'icon-interaction'
        const icons = [
            activityIcon1.current.querySelector('.MuiSvgIcon-root'),
            activityIcon2.current.querySelector('.MuiSvgIcon-root'),
            activityIcon3.current.querySelector('.MuiSvgIcon-root'),
            activityIcon4.current.querySelector('.MuiSvgIcon-root'),
        ];

        activityIcons.forEach((activityIcon, index) => {
            activityIcon.addEventListener('mouseover', () => {
                activityIcon.style.borderRadius = '50%';
                switch (index) {
                    case 1:
                        icons[index].style.color = 'var(--twitter-greenColor)';
                        iconInteractions[index].style.color =
                            'var(--twitter-greenColor)';
                        activityIcon.style.backgroundColor =
                            'var(--twitter-greenHover)';
                        break;
                    case 2:
                        icons[index].style.color = 'var(--twitter-redColor)';
                        iconInteractions[index].style.color =
                            'var(--twitter-redColor)';
                        activityIcon.style.backgroundColor =
                            'var(--twitter-redHover)';
                        break;
                    default:
                        icons[index].style.color = 'var(--twitter-color)';
                        iconInteractions[index].style.color =
                            'var(--twitter-color)';
                        activityIcon.style.backgroundColor =
                            'var(--twitter-cianHover)';
                        break;
                }
                activityIcon.style.transition =
                    'background-color 200ms ease-out';
            });

            activityIcon.addEventListener('mouseleave', () => {
                // Reset styles when mouse leaves
                activityIcon.style.backgroundColor = ''; // Set to the default or remove this line if not needed
                activityIcon.style.borderRadius = '';
                if (
                    !(index == 2 && isLikeActive) &&
                    !(index == 1 && isrepostActive)
                ) {
                    icons[index].style.color = 'var(--twitter-greyColor)';
                    iconInteractions[index].style.color = '';
                }
                activityIcon.style.transition = '';
            });
        });

        iconInteractions.forEach((iconInteraction, index) => {
            iconInteraction.addEventListener('mouseover', () => {
                switch (index) {
                    case 1:
                        icons[index].style.color = 'var(--twitter-greenColor)';
                        iconInteraction.style.color =
                            'var(--twitter-greenColor)';
                        activityIcons[index].style.backgroundColor =
                            'var(--twitter-greenHover)';
                        break;
                    case 2:
                        icons[index].style.color = 'var(--twitter-redColor)';
                        iconInteraction.style.color = 'var(--twitter-redColor)';
                        activityIcons[index].style.backgroundColor =
                            'var(--twitter-redHover)';
                        break;
                    default:
                        icons[index].style.color = 'var(--twitter-color)';
                        iconInteraction.style.color = 'var(--twitter-color)';
                        activityIcons[index].style.backgroundColor =
                            'var(--twitter-cianHover)';
                        break;
                }
                activityIcons[index].style.borderRadius = '50%';
                activityIcons[index].style.transition =
                    'background-color 200ms ease-out';
            });

            iconInteraction.addEventListener('mouseleave', () => {
                if (!(index == 1 && isrepostActive)) {
                    activityIcons[index].style.backgroundColor = '';
                    activityIcons[index].style.borderRadius = '';
                    if (
                        !(index == 2 && isLikeActive) &&
                        !(index == 1 && isrepostActive)
                    ) {
                        iconInteraction.style.color = '';
                        icons[index].style.color = 'var(--twitter-greyColor)';
                    }
                    activityIcons[index].style.transition = '';
                }
            });
        });
    }, []);

    const likeDislikeTweetHandler = (e) => {
        e.stopPropagation();
        if (isLikeActive) {
            //dislike it
            apiDislikeTweet(tweetId, token);
            setTweetLikes((likes) => likes - 1);
        } else {
            apiLikeTweet(tweetId, token);
            setTweetLikes((likes) => likes + 1);
        }
        setLikeActive(!isLikeActive);
    };
    const repostHandler = (event) => {
        event.stopPropagation();
        if (isrepostActive) {
            apiDeleteRepost(tweetId, token);
            setTweetReposts((reposts) => reposts - 1);
        } else {
            apiRepost(tweetId, token);
            setTweetReposts((reposts) => reposts + 1);
        }
        setRepostActive((isrepostActive) => !isrepostActive);
    };
    const getreplieshandler = (event) => {
        event.stopPropagation();
        navigate(`/${handle}/${tweetId}`, {
            state: { tweetId: tweetId },
        });
    };

    const [anchorEl, setAnchorEl] = useState(null);

    const optionsClickHandler = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const optionsCloseHandler = (event) => {
        event.stopPropagation();
        setAnchorEl(null);
    };

    const deleteTweetHandler = (event) => {
        event.stopPropagation();
        removeTweet(tweetId);
    };
    const [isReplyWindow, setIsReplyWindow] = useState(false);

    const replyWindowClose = (event) => {
        event.stopPropagation();
        setIsReplyWindow(false);
    };

    const replyWindowOpen = (event) => {
        event.stopPropagation();
        setIsReplyWindow(true);
    };

    const addReplyHandler = async (text, images) => {
        if (await apiAddReply(tweetId, text, images, token)) {
            setTweetReplies((prevReplies) => prevReplies + 1);
        }
    };
    return (
        <>
            <div className="tweet" onClick={getreplieshandler}>
                <div className="repost"></div>
                <div className="tweet-container">
                    <div className="avatar-container ">
                        <div className="avatar-box" onClick={profileRouting}>
                            <Avatar
                                src={`http://tweaxybackend.mywire.org/api/v1/images/${avatar}`}
                            ></Avatar>
                        </div>
                    </div>
                    <div className="tweet-main">
                        <div className="tweet-user">
                            <div className="info-container">
                                <span
                                    className="username"
                                    onClick={profileRouting}
                                >
                                    {username}
                                </span>
                                <span className="handle">
                                    &nbsp;{`@${handle}`}
                                </span>
                                <div className="dot-container">
                                    <span className="dot">.</span>
                                </div>
                                <span
                                    className="profileBiography-joinDate"
                                    style={{ paddingBottom: '5px' }}
                                >
                                    {TweetDate(uploadTime)}
                                </span>
                            </div>
                            <div
                                data-test={hashText(
                                    TweetSelectors.TWEET_OPTIONS +
                                        username +
                                        tweetText
                                )}
                                className="options-container cian-hover"
                                onClick={optionsClickHandler}
                            >
                                <MoreHorizIcon />
                            </div>
                            <div
                                onClick={(event) => {
                                    event.stopPropagation();
                                }}
                            >
                                <TweetOptionsPopDown
                                    isCurrentUserTweet={isCurrentUserTweet}
                                    handleClose={optionsCloseHandler}
                                    anchorEl={anchorEl}
                                    deleteTweetHandler={deleteTweetHandler}
                                    tweetid={tweetId}
                                    token={token}
                                    username={handle}
                                    userID={userID}
                                    handleTweetsFiltering={(msg, id) => {
                                        setAnchorEl(null);
                                        handleTweetsFiltering(msg, id);
                                    }}
                                    followedByMe={followedByMe}
                                />
                            </div>
                        </div>
                        <div className="tweet-text-container">
                            <span className="tweet-text">{tweetText}</span>
                        </div>

                        <div className="tweet-media-container">
                            {/* {!tweetMedia &&  <img src="" alt="test" />} */}
                            {tweetMedia && [tweetMedia].length > 0 && (
                                <div style={{ height: '10px' }}></div>
                            )}

                            {tweetMedia && [tweetMedia].length > 0 && (
                                <MediaChecker media={[tweetMedia]} />
                            )}
                        </div>

                        <div className="tweet-activity">
                            <div className="tweet-icon">
                                {/* icon */}
                                <div
                                    className="activity-icon"
                                    ref={activityIcon1}
                                    onClick={replyWindowOpen}
                                >
                                    <ChatBubbleOutlineOutlinedIcon />
                                </div>
                                <span
                                    className="icon-interaction"
                                    ref={iconInteraction1}
                                >
                                    <span className="interaction">
                                        {tweetReplies != 0 && `${tweetReplies}`}
                                    </span>
                                </span>
                            </div>

                            <div className="tweet-icon">
                                {/* icon */}
                                <div
                                    className="activity-icon"
                                    ref={activityIcon2}
                                    onClick={repostHandler}
                                >
                                    {/* <CachedOutlinedIcon/> */}{' '}
                                    {isrepostActive ? (
                                        <CachedOutlinedIcon className="repost-active" />
                                    ) : (
                                        <CachedOutlinedIcon />
                                    )}
                                </div>
                                <span
                                    className="icon-interaction"
                                    ref={iconInteraction2}
                                    onClick={repostHandler}
                                >
                                    <span
                                        className={`interaction ${
                                            isrepostActive
                                                ? 'repost-active'
                                                : ''
                                        }`}
                                    >
                                        {tweetReposts != 0 && `${tweetReposts}`}
                                    </span>
                                </span>
                            </div>

                            <div className="tweet-icon">
                                {/* icon */}
                                {/* <div ref={ctivityIcon3}></div> */}
                                <div
                                    className="activity-icon"
                                    ref={activityIcon3}
                                    onClick={likeDislikeTweetHandler}
                                >
                                    {!isLikeActive && (
                                        <FavoriteBorderOutlinedIcon />
                                    )}
                                    {isLikeActive != false && (
                                        <FavoriteIcon className="like-active" />
                                    )}
                                </div>
                                <span
                                    className="icon-interaction"
                                    ref={iconInteraction3}
                                    onClick={likeDislikeTweetHandler}
                                >
                                    <span className="interaction">
                                        {tweetLikes > 0 && `${tweetLikes}`}
                                    </span>
                                </span>
                            </div>

                            <div className="tweet-icon">
                                {/* icon */}
                                <div
                                    className="activity-icon"
                                    ref={activityIcon4}
                                >
                                    <BarChartOutlinedIcon />
                                </div>
                                <span
                                    className="icon-interaction"
                                    ref={iconInteraction4}
                                >
                                    <span className="interaction">
                                        {tweetInsights != 0 &&
                                            `${tweetInsights}`}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isReplyWindow && (
                <AddReplyWindow
                    open={isReplyWindow}
                    closeHandler={replyWindowClose}
                    avatar={avatar}
                    username={username}
                    handle={handle}
                    uploadTime={uploadTime}
                    tweetText={tweetText}
                    addReplyHandler={addReplyHandler}
                />
            )}
        </>
    );
}
