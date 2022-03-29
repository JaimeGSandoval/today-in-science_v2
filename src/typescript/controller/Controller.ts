import { ArticleAPI, Article, storeData } from '../model/ArticleService';
import { TwitterAPI, Tweet } from '../model/TwitterService';
// import { TwitterAPI } from '../model/TwitterService';
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
    const container = document.getElementById('main') as HTMLDivElement;

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

  // OG
  // public async getAllTweets(): Promise<Tweet[]> {
  //   const retrievedTweets = await this._twitterService.getAllTweets();

  //   // do data filtering here w/ retrieved tweets?

  //   return convertToArray(retrievedTweets) as Tweet[];
  // }

  public async getAllTweets(): Promise<Tweet[]> {
    const itemContentData: any[] = [];
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

        const tweetObj: Tweet = {
          favorite_count,
          reply_count,
          retweet_count,
          full_text: full_text.split('https')[0],
          image_url: extended_entities.media[0].media_url_https,
        };

        tweetArray.push(tweetObj);
        // console.log(tweet.legacy.extended_entities.media[0].media_url_https);
        // console.log('fav count', tweet.legacy.favorite_count);
        // console.log('reply count', tweet.legacy.reply_count);
        // console.log('retweet count', tweet.legacy.retweet_count);
        // console.log('full text', tweet.legacy.full_text.split('https')[0]);
        // console.log('BREAK');
      }
    });

    return tweetArray;
    // return convertToArray(retrievedTweets);
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

// OG
// const convertToArray = (twitterObject: { data: { tweets: any } }): Tweet[] => {
//   let result: Tweet[] = [];

//   // legacy here?

//   const tweets: Tweet[] = Object.values(twitterObject.data.tweets);
//   result = tweets.filter((tweet) => {
//     if (tweet.favorite_count && tweet.entities.media) {
//       return tweet;
//     }
//   });
//   return result.slice(0, 10);
// };

// const convertToArray = (twitterObject: { data: { tweets: any } }) => {
//   let result = [];

//   // legacy here?

//   const tweets: any[] = Object.values(twitterObject.data.tweets);
//   result = tweets.filter((tweet) => {
//     if (tweet.favorite_count && tweet.entities.media) {
//       return tweet;
//     }
//   });
//   return result.slice(0, 10);
// };

// End Tweets *********************8

const resetViewport = (): void => {
  const main = document.querySelector('.main-container');
  main?.scrollTo(0, 0);
};

document
  .getElementById('logo-container')
  ?.addEventListener('click', resetViewport);
