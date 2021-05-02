interface ITweetList {
  tweets: [];
}

class TweetList implements ITweetList {
  tweets: [];
  constructor(tweets: []) {
    this.tweets = tweets;
  }
}

export default TweetList;
