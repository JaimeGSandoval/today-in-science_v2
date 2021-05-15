export default class Tweet {
  public readonly image_url: string; // <img>
  public readonly full_text: string; // <p>
  public readonly favorite_count: number; // <icon> or  <img>& <span>
  public readonly reply_count: number; // <i> or <img> & <span>
  public readonly retweet_count: number; // <i> or <img> & <span>
  public readonly entities: any;
  public readonly created_at: Date;

  constructor(
    image_url: string,
    full_text: string,
    favorite_count: number,
    reply_count: number,
    retweet_count: number,
    created_at: Date
  ) {
    this.image_url = image_url;
    this.full_text = full_text;
    this.favorite_count = favorite_count;
    this.reply_count = reply_count;
    this.retweet_count = retweet_count;
    this.created_at = new Date(created_at);
  }
}
