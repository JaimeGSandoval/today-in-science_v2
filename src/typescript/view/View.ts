import { Article } from '../model/ArticleService';
import { Tweet } from '../model/TwitterService';

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
    return newArticles;
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
    return newTweets;
  }

  // public createTweetDomElements(tweet: Tweet) {
  //   const text = document.createElement('h1');
  //   text.textContent = `TWEET: ${tweet.full_text}`;
  //   // text.classList.add('spacexText');
  //   document.body.appendChild(text);
  // }
  // public createArticleDomElements(article: Article) {
  //   const text = document.createElement('h1');
  //   text.textContent = `ARTICLE: ${article.title}`;
  //   document.body.appendChild(text);
  // }
}
