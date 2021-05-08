import { Tweet } from '../model/TwitterService';
import { Article } from '../model/ArticleService';

export const createArticleDomElements = (articles: Article[]) => {
  const container = document.getElementById(
    'article-container'
  ) as HTMLDivElement;

  articles.forEach((article: Article) => {
    const title: string = article.title;
    const link: string = article.link;
    const date: string = new Date(article.published_date).toDateString();

    const div = document.createElement('div') as HTMLDivElement;
    const h1 = document.createElement('h1');
    h1.textContent = title;
    const test = h1.textContent.split('-');
    h1.textContent = test[0];
    const sourceText = document.createElement('p');
    sourceText.textContent = test[1];

    const url = document.createElement('a') as HTMLAnchorElement;
    url.setAttribute('href', link);

    const dateStr = document.createElement('p');
    dateStr.textContent = date;
    div.append(h1, sourceText, dateStr);
    url.appendChild(div);
    return container?.append(url);
  });
};

export const createTweetDomElements = (tweets: Tweet[]) => {
  tweets.forEach((tweet: Tweet) => {
    const text = document.createElement('h1');
    text.textContent = `TWEET: ${tweet.full_text}`;
    return document.body.appendChild(text);
  });
};
