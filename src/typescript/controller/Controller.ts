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

  public async getAllArticles(): Promise<any> {
    const result = await this._articleService
      .getAllArticles()
      .then((articleData) => {
        const retrievedArticles = articleData.articles.slice(0, 29);
        retrievedArticles.forEach((article: Article) => {
          console.log(article);
        });
      })
      .catch((error) => console.log(error));

    return result;
  }

  public async getAllTweets(): Promise<any> {
    let result: Tweet[];
    const tweetsArray: Tweet[] = [];
    return await this._twitterService.getAllTweets().then((twitterData) => {
      const retrievedTweets = twitterData.data.tweets;
      for (const tweet in retrievedTweets) {
        if (
          retrievedTweets[tweet].favorite_count &&
          retrievedTweets[tweet].entities.media
        ) {
          tweetsArray.push(retrievedTweets[tweet]);
        }
      }
      console.log(tweetsArray.slice(0, 10));
      result = tweetsArray.slice(0, 10);
      return result;
    });
  }

  public start() {
    this.getAllArticles();
    this.getAllTweets();
  }
}
