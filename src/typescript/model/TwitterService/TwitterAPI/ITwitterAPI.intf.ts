import TweetList from '../TweetList/TweetList';

interface ITwitterAPI {
  getAllNasaTweets(): Promise<TweetList>;
  getAllSpaceXTweets(): Promise<TweetList>;
}

export default ITwitterAPI;
