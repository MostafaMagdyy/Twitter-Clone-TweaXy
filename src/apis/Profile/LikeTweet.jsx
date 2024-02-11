
const apiLikeTweet =async (tweetId,token) => {
    const likeTweetURL =`http://tweaxybackend.mywire.org/api/v1/interactions/${tweetId}/like`;
    // console.log("this is a token" + token);
    try {
      const response = await fetch(likeTweetURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      
      const responseData = await response.json();
      console.log(responseData);
      if (responseData.status != "success") {
        // take action 
        console.log("cant Like Tweet");
      } else {
        console.log("Tweet LIKED");
      }
    } catch (error) {
      // Handle errors during the fetch
      console.error("There was a problem with the fetch operation:", error);
    }
  };


  const apiDislikeTweet =async (tweetId,token) => {
    const DislikeTweetURL =`http://tweaxybackend.mywire.org/api/v1/interactions/${tweetId}/like`;
    // console.log("this is a token" + token);
    try {
      const response = await fetch(DislikeTweetURL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      
      const responseData = await response.json();
      console.log(responseData);
      if (responseData.status != "success") {
        // take action 
        console.log("cant Dislike Tweet");
      } else {
        console.log("Tweet DISLIKED");
      }
    } catch (error) {
      // Handle errors during the fetch
      console.error("There was a problem with the fetch operation:", error);
    }
  };



  export  { apiLikeTweet ,  apiDislikeTweet};












  