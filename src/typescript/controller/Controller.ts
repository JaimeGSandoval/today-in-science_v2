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
    const container = document.getElementById('main') as HTMLElement;

    if (sessionStorage.getItem(subject)) {
      container.innerHTML = '';
      container.scrollTo(0, 0);
      const articles = JSON.parse(sessionStorage.getItem(subject) || '{}');
      return articles;
    }

    container.innerHTML = '';
    let retrievedArticles = await this._articleService.getAllArticles(subject);
    retrievedArticles = retrievedArticles.articles.slice(0, 30);
    storeData(subject, retrievedArticles);
    return retrievedArticles as Article[];
  }

  // Start Tweets ******************
  public async getAllTweets(): Promise<Tweet[]> {
    const tweetArray: Tweet[] = [];

    type NestedTweet = {
      content: {
        itemContent: any;
      };
    };

    type ResponseObj = {
      data: {
        user: {
          result: any;
        };
      };
    };

    type Result = {
      result: any;
      legacy: any;
    };

    // type ContentData = Result[];

    const itemContentData: Result[] = [];

    try {
      const fetchedData: ResponseObj =
        await this._twitterService.getAllTweets();

      fetchedData.data.user.result.timeline.timeline.instructions[1].entries.forEach(
        (item: NestedTweet) => {
          if (item.content.itemContent) {
            itemContentData.push(item.content.itemContent.tweet_results.result);
          }
        }
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Failed to retrieve twitter data: ', error);
        throw new Error(
          `Could not parse the response body as JSON: ${error.message}`
        );
      }
    }

    itemContentData.forEach((tweet) => {
      if (tweet.legacy.extended_entities) {
        const {
          favorite_count,
          reply_count,
          retweet_count,
          full_text,
          extended_entities,
        } = tweet.legacy;

        const url = full_text.split('https');

        const tweetObj: Tweet = {
          image_url: extended_entities.media[0].media_url_https,
          full_text: full_text.split('https')[0],
          favorite_count,
          reply_count,
          retweet_count,
          tweet_url: url[url.length - 1],
        };

        tweetArray.push(tweetObj);
      }
    });

    return tweetArray;
  }

  public async start() {
    const AIArticles = await this.getAllArticles('AI');
    this._view.createArticles(AIArticles);

    const jsMediaQuery = window.matchMedia('(min-width: 1024px)');
    if (jsMediaQuery.matches) {
      const tweets = await this.getAllTweets();

      this._view.createTweets(tweets);
    }
  }
}

// End Tweets *********************8

const resetViewport = (): void => {
  const main = document.querySelector('.main-container') as HTMLElement;
  main.scrollTo(0, 0);
};

document
  .getElementById('logo-container')!
  .addEventListener('click', resetViewport);
