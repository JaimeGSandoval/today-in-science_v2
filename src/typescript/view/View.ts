import { Article } from '../model/ArticleService';
import { Tweet } from '../model/TwitterService';
import { createArticleDomElements } from './dom-creation';
import { createTweetDomElements } from './dom-creation';

export default class View {
  public createArticles(articles: Article[]) {
    const newArticles = articles.map((article) => {
      return new Article(
        article.title,
        article.link,
        article.source,
        article.published_date
      );
    });
    const date = new Date(newArticles[0].published_date);
    console.log('ARTICLE DATE', date.toDateString());

    createArticleDomElements(newArticles);
    return;
  }

  public createTweets(tweets: Tweet[]) {
    const newTweets = tweets.map((tweet) => {
      return new Tweet(
        tweet.entities.media[0].media_url,
        tweet.full_text,
        tweet.favorite_count,
        tweet.reply_count,
        tweet.retweet_count
      );
    });

    return createTweetDomElements(newTweets);
  }
}
