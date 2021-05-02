import ITweet from './ITweet.intf';

export class Tweet implements ITweet {
  public readonly image_url: string;
  public readonly full_text: string;
  public readonly favorite_count: number;
  public readonly reply_count: number;
  public readonly retweet_count: number;
  public readonly entities: any;

  constructor(
    image_url: string,
    full_text: string,
    favorite_count: number,
    reply_count: number,
    retweet_count: number
  ) {
    this.image_url = image_url;
    this.full_text = full_text;
    this.favorite_count = favorite_count;
    this.reply_count = reply_count;
    this.retweet_count = retweet_count;
  }
}

export const createNewTweet = (twitterData: Tweet): Tweet => {
  return new Tweet(
    twitterData.image_url,
    twitterData.full_text,
    twitterData.favorite_count,
    twitterData.reply_count,
    twitterData.retweet_count
  );
};

export const createTweetDomElements = (tweet: Tweet) => {
  const text = document.createElement('h1');
  text.textContent = 'TWEET: ' + tweet.full_text;
  text.classList.add('spacexText');

  document.body.appendChild(text);
};
