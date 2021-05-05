import { ArticleAPI, Article } from '../model/ArticleService';
import { TwitterAPI, Tweet } from '../model/TwitterService';
import { View } from '../view';

export default class Controller {
  private readonly _articleService: ArticleAPI;
  private readonly _twitterService: TwitterAPI;
  private readonly _view: View;

  constructor(
    articleService: ArticleAPI,
    twitterService: TwitterAPI,
    view: View
  ) {
    if (!articleService) {
      throw new Error('The Article Service API is mandatory.');
    }

    if (!twitterService) {
      throw new Error('The Twitter Service API is mandatory.');
    }

    if (!view) {
      throw new Error('View argument is mandatory');
    }

    this._articleService = articleService;
    this._twitterService = twitterService;
    this._view = view;
  }

  public async getAllArticles(subject: string): Promise<Article[]> {
    let retrievedArticles = await this._articleService.getAllArticles(subject);
    retrievedArticles = retrievedArticles.articles.slice(0, 30);
    return retrievedArticles as Article[];
  }

  public async getAllTweets(): Promise<Tweet[]> {
    const retrievedTweets = await this._twitterService.getAllTweets();
    return convertToArray(retrievedTweets) as Tweet[];
  }

  public async start() {
    const articles = await this.getAllArticles('Quantum%20Computing');
    const tweets = await this.getAllTweets();
    console.log('ARTICLES: ', this._view.createArticles(articles));
    console.log('TWEETS: ', this._view.createTweets(tweets));
    // this._view.displayArticles(articles);
    // this._view.displayTweets(tweets);
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
  return result.slice(0, 10);
};
