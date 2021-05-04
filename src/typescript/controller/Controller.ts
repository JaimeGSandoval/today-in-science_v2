import { ArticleAPI, Article } from '../model/ArticleService';
import { TwitterAPI, Tweet } from '../model/TwitterService';

export default class Controller {
  private readonly _articleService: ArticleAPI;
  private readonly _twitterService: TwitterAPI;

  constructor(articleService: ArticleAPI, twitterService: TwitterAPI) {
    if (!articleService) {
      throw new Error('The Article Service API is mandatory.');
    }

    if (!twitterService) {
      throw new Error('The Article Service API is mandatory.');
    }

    this._articleService = articleService;
    this._twitterService = twitterService;
  }

  public async getAllArticles(): Promise<Article[]> {
    let retrievedArticles = await this._articleService.getAllArticles();
    retrievedArticles = retrievedArticles.articles.slice(0, 30);
    return retrievedArticles as Article[];
  }

  public async getAllTweets(): Promise<Tweet[]> {
    let retrievedTweets = await this._twitterService.getAllTweets();
    retrievedTweets = convertToArray(retrievedTweets).slice(0, 10);
    return retrievedTweets as Tweet[];
  }

  public start() {
    this.getAllArticles();
    this.getAllTweets();
  }
}

const convertToArray = (twitterObject: { data: { tweets: any } }): Tweet[] => {
  let result: Tweet[] = [];
  const tweets: Tweet[] = Object.values(twitterObject.data.tweets);
  result = tweets.filter((tweet) => {
    if (tweet.favorite_count && tweet.entities.media) {
      return tweet;
    }
  });
  return result;
};
