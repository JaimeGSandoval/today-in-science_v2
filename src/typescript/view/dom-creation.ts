import { Tweet } from '../model/TwitterService';
import { Article } from '../model/ArticleService';

export const createArticleDomElements = (articles: Article[]) => {
  const container = document.getElementById(
    'article-container'
  ) as HTMLDivElement;

  articles.forEach((articles: Article) => {
    const text = document.createElement('h1');
    text.textContent = `ARTICLE: ${articles.title}`;
    return container?.appendChild(text);
  });
};

export const createTweetDomElements = (tweets: Tweet[]) => {
  tweets.forEach((tweet: Tweet) => {
    const text = document.createElement('h1');
    text.textContent = `TWEET: ${tweet.full_text}`;
    return document.body.appendChild(text);
  });
};
