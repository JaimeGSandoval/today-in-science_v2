interface ITweet {
  image_url: string;
  full_text: string;
  favorite_count: number;
  reply_count: number;
  retweet_count: number;
  entities: any;
}

export default ITweet;
