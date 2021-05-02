import ITwitterAPI from './ITwitterAPI.intf';
import TweetList from '../TweetList/TweetList';
import { createTweetDomElements } from '../Tweet/Tweet';
import { Tweet } from '../Tweet/Tweet';

class TwitterAPI implements ITwitterAPI {
  private _webSearchApiKey: string;

  constructor() {
    this._webSearchApiKey =
      '6bb1f7d518mshee6c717c3746b3ap119550jsned3e9335e862';
  }

  private async _checkResponseData(response: Response): Promise<Response> {
    if (!response) {
      throw new Error('A response must be provided!');
    }
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }

  private async _getJsonContent(response: Response): Promise<unknown> {
    if (!response) {
      throw new Error('A response must be provided!');
    }
    let jsonContent: unknown = undefined;

    try {
      jsonContent = await response.json();
    } catch (error) {
      console.error('Failed to parse the response as JSON: ', error);
      throw new Error(
        `Could not parse the response body as JSON. Error: ${error.message}`
      );
    }
    return jsonContent;
  }

  public async getAllNasaTweets(): Promise<TweetList> {
    const response: Response = await fetch(
      'https://twitter32.p.rapidapi.com/getTweets?user_id=11348282',
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key': this._webSearchApiKey,
          'x-rapidapi-host': 'twitter32.p.rapidapi.com',
        },
      }
    );
    const checkedResponse: Response = await this._checkResponseData(response);
    const jsonContent = await this._getJsonContent(checkedResponse);
    return jsonContent as TweetList;
  }

  public async getAllSpaceXTweets(): Promise<TweetList> {
    const response: Response = await fetch(
      'https://twitter32.p.rapidapi.com/getTweets?user_id=21436960',
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key':
            '6bb1f7d518mshee6c717c3746b3ap119550jsned3e9335e862',
          'x-rapidapi-host': 'twitter32.p.rapidapi.com',
        },
      }
    );
    const checkedResponse: Response = await this._checkResponseData(response);
    const jsonContent = await this._getJsonContent(checkedResponse);
    return jsonContent as TweetList;
  }
}

const apiNasaClient = new TwitterAPI();
const apiSpaceXClient = new TwitterAPI();

apiNasaClient.getAllNasaTweets().then((twitterData: any) => {
  const retrievedTweets = twitterData.data.tweets;
  for (const tweet in retrievedTweets) {
    if (
      retrievedTweets[tweet].favorite_count &&
      retrievedTweets[tweet].entities.media
    ) {
      createTweetDomElements(retrievedTweets[tweet]);
      console.log(retrievedTweets[tweet]);
      // console.log('NASA FAVORITE COUNT: ', retrievedTweets[tweet].favoriteCount);
      // console.log('NASA REPLY COUNT: ', retrievedTweets[tweet].replyCount);
      // console.log('NASA RETWEET COUNT: ', retrievedTweets[tweet].retweetCount);
      // console.log('\n');
    }
  }
});

apiSpaceXClient.getAllSpaceXTweets().then((twitterData: any) => {
  const retrievedTweets: Tweet[] = twitterData.data.tweets;
  const tempArr = [];
  for (const tweet in retrievedTweets) {
    tempArr.push(retrievedTweets[tweet]);
  }

  // tempArr.slice(0, 5).forEach((item) => {
  //   console.log(item.favorite_count);
  //   console.log(item.full_text);
  //   console.log(item.image_url);
  //   console.log(item.reply_count);
  //   console.log(item.retweet_count);
  // });
  // if (
  //   retrievedTweets[tweet].favorite_count &&
  //   retrievedTweets[tweet].entities.media
  // ) {
  //   console.log(retrievedTweets);
  //   // createTweetDomElements(retrievedTweets[tweet]);
  //   // console.log('SPACEX FAVORITE COUNT: ', retrievedTweets[tweet].favorite_count);
  //   // console.log('SPACEX REPLY COUNT: ', retrievedTweets[tweet].reply_count);
  //   // console.log('SPACEX RETWEET COUNT: ', retrievedTweets[tweet].retweet_count);
  //   // console.log('\n');
  // }
});

export default TwitterAPI;

// NASA
// fetch('https://twitter32.p.rapidapi.com/getTweets?user_id=11348282', {
//   method: 'GET',
//   headers: {
//     'x-rapidapi-key': '6bb1f7d518mshee6c717c3746b3ap119550jsned3e9335e862',
//     'x-rapidapi-host': 'twitter32.p.rapidapi.com',
//   },
// })
//   .then((response) => response.json())
//   .then((twitterData) => {
//     const tweets = twitterData.data.tweets;
//     let counter = 0;
//     for (const tweet in tweets) {
//       // console.log(tweets[tweet]);
//       if (tweets[tweet].favorite_count && tweets[tweet].entities.media) {
//         console.log('IMAGE URL: ', tweets[tweet].entities.media[0].media_url);
//         console.log('FULL TEXT: ', tweets[tweet].full_text);
//         console.log('FAVORITE COUNT: ', tweets[tweet].favorite_count);
//         console.log('REPLY COUNT: ', tweets[tweet].reply_count);
//         console.log('RETWEET COUNT: ', tweets[tweet].retweet_count);
//         console.log('\n');
//         counter++;
//       }
//     }
//     console.log(counter);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// Space X
// fetch('https://twitter32.p.rapidapi.com/getTweets?user_id=21436960', {
//   method: 'GET',
//   headers: {
//     'x-rapidapi-key': '6bb1f7d518mshee6c717c3746b3ap119550jsned3e9335e862',
//     'x-rapidapi-host': 'twitter32.p.rapidapi.com',
//   },
// })
//   .then((response) => response.json())
//   .then((twitterData) => {
//     // console.log(twitterData);
//     const tweets = twitterData.data.tweets;
//     let counter = 0;
//     for (const tweet in tweets) {
//       // console.log(tweets[tweet]);
//       // if (tweets[tweet].entities.media) {
//       //   console.log(tweets[tweet].entities.media[0].media_url);
//       // }
//       if (tweets[tweet].favorite_count && tweets[tweet].entities.media) {
//         console.log('IMAGE URL: ', tweets[tweet].entities.media[0].media_url);
//         console.log('FULL TEXT: ', tweets[tweet].full_text);
//         console.log('FAVORITE COUNT: ', tweets[tweet].favorite_count);
//         console.log('REPLY COUNT: ', tweets[tweet].reply_count);
//         console.log('RETWEET COUNT: ', tweets[tweet].retweet_count);
//         console.log('\n');
//         counter++;
//       }
//     }
//     console.log(counter);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
