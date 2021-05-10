import { ArticleAPI, Article, storeData } from '../model/ArticleService';
import { TwitterAPI, Tweet } from '../model/TwitterService';
import { View } from '../view';

export default class Controller {
  private readonly _articleService: ArticleAPI;
  private readonly _twitterService: TwitterAPI;
  private _view: View;

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
    const percent = '%20';
    if (subject.indexOf(percent) !== -1) {
      subject = subject.replace('%20', '-');
    }

    const container = document.getElementById(
      'article-container'
    ) as HTMLDivElement;

    if (sessionStorage.getItem(subject)) {
      container.innerHTML = '';
      console.log('From session storage');
      const articles = JSON.parse(sessionStorage.getItem(subject) || '{}');
      return articles;
    }

    console.log('From API');

    let retrievedArticles = await this._articleService.getAllArticles(subject);
    retrievedArticles = retrievedArticles.articles.slice(0, 30);
    storeData(subject, retrievedArticles);
    container.innerHTML = '';
    return retrievedArticles as Article[];
  }

  public async getAllTweets(): Promise<Tweet[]> {
    const retrievedTweets = await this._twitterService.getAllTweets();
    return convertToArray(retrievedTweets) as Tweet[];
  }

  public async start() {
    const quantumArticles = await this.getAllArticles('quantum%20computing');
    // const astroArticles = await this.getAllArticles('Astronomy');
    const tweets = await this.getAllTweets();
    this._view.createArticles(quantumArticles);
    // this._view.createArticles(astroArticles);
    this._view.createTweets(tweets);
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
