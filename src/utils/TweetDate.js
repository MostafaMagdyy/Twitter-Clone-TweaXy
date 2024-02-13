const TweetDate = (tweetDate) => {
    const now = new Date();
    const tweetTime = new Date(tweetDate);
    const timeDifference = now - tweetTime;
    const millisecondsPerMinute = 60 * 1000;
    const millisecondsPerHour = 60 * millisecondsPerMinute;
    const millisecondsPerDay = 24 * millisecondsPerHour;
    if (timeDifference < millisecondsPerHour) {
        const minutes = Math.floor(timeDifference / millisecondsPerMinute);
        return `${minutes}m`; // Output format: e.g., "5m"
    } else if (timeDifference < millisecondsPerDay) {
        const hours = Math.floor(timeDifference / millisecondsPerHour);
        return `${hours}h`; // Output format: e.g., "3h"
    } else {
        // Formatting for more than a day
        const month = tweetTime.toLocaleString('default', { month: 'short' });
        const day = tweetTime.getDate();
        return `${month} ${day}`; // Output format: e.g., "Dec 8"
    }
};
export default TweetDate;
