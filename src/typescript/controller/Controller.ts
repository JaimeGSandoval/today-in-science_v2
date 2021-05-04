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
    console.log(retrievedArticles);
    return retrievedArticles as Article[];
  }

  public async getAllTweets(): Promise<Tweet[]> {
    let retrievedTweets = await this._twitterService.getAllTweets();
    retrievedTweets = convertToArray(retrievedTweets).slice(0, 10);
    console.log(retrievedTweets);
    return retrievedTweets as Tweet[];
  }

  public start() {
    this.getAllArticles();
    this.getAllTweets();
  }
}

const convertToArray = (twitterObject: { data: { tweets: any } }): Tweet[] => {
  const result = [];
  const tweets = twitterObject.data.tweets;
  for (const tweet in tweets) {
    if (tweets[tweet].favorite_count && tweets[tweet].entities.media) {
      result.push(tweets[tweet]);
    }
  }
  return result;
};
