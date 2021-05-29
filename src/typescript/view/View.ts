import { Article } from '../model/ArticleService';
import { Tweet } from '../model/TwitterService';
import {
  createTextArr,
  createUrl,
  createDateText,
  tempSubject,
} from './article-dom-creation';
import {
  colorizeSelectedText,
  createTweetTextArr,
  createTweetUrl,
  createCount,
} from './tweet-dom-creation';

export default class View {
  public createArticles(articles: Article[]) {
    let newArticles = articles.map((article) => {
      return new Article(
        article.title,
        article.link,
        article.source,
        article.published_date
      );
    });

    newArticles = sortItemsByDate(newArticles);
    return createArticleDomElements(newArticles);
  }

  public createTweets(tweets: Tweet[]) {
    let newTweets = tweets.map((tweet) => {
      return new Tweet(
        tweet.entities.media[0].media_url,
        tweet.full_text,
        tweet.favorite_count,
        tweet.reply_count,
        tweet.retweet_count,
        tweet.created_at
      );
    });

    newTweets = sortItemsByDate(newTweets);
    return createTweetDomElements(newTweets);
  }
}

const sortItemsByDate = (array: any) => {
  return (array = array.sort((a: any, b: any) => {
    return a.created_at
      ? b.created_at - a.created_at
      : b.published_date - a.published_date;
  }));
};

const createArticleDomElements = (articles: Article[]) => {
  const mainContainer = document.getElementById('main') as HTMLElement;
  document.getElementById('loader')!.style.display = 'none';

  // id = 'article-url';
  articles.forEach((article: Article) => {
    const articleTemplate: string = `<a href="${
      article.link
    }"  class="article-url" rel="noopener" rel="noreferrer" target="_blank">

        <section id="article-container" class="article-container">
          <div id="article-header-container" class="article-header-container">
            <span class="article-header article-subject">${tempSubject} &nbsp;|&nbsp;</span>
            <span class="article-header article-source">${
              article.source.title
            }</span>
          </div>

          <div id="article-title-container" class="article-title-container">
            <p class="article-title">${article.title}</p>
          </div>

          <div class="article-date-container">
            <span class="article-date">${createDateText(
              article.published_date
            )}</span>

            <span class="astronaut-icon-container">
              <picture>
                <source srcset="/src/assets/icons/webp/astronaut-80.webp">
                <img src="/src/assets/icons/png/astronaut-80.png" width="40" height="40" alt="Astronaut icon">
              </picture>
            </span>
          </div>
        </section>

      </a>`;

    mainContainer!.innerHTML += articleTemplate;
  });
};

const createTweetDomElements = (tweets: Tweet[]) => {
  const tweetListContainer = document.getElementById(
    'tweet-list-container'
  ) as HTMLDivElement;

  tweets.forEach((tweet: Tweet) => {
    const imageUrl: string = tweet.image_url;
    const tweetFullText: string = tweet.full_text;
    const tweetReplies: number = tweet.reply_count;
    const tweetRetweets: number = tweet.retweet_count;
    const tweetFavorites: number = tweet.favorite_count;
    const coloredText: string = colorizeSelectedText(tweetFullText);
    const tweetTextArray: string[] = createTweetTextArr(coloredText);
    const urlString: string = createTweetUrl(tweetTextArray);

    const tweetTemplate: string = `<a href="${createUrl(
      urlString
    )}" class="tweet-url" target="_blank" rel="noopener" rel="noreferrer">
        <div id="tweet-container" class="tweet-container">

          <div class="top-row">
            <div class="spacex-text-container">
              <span class="spacex-title-white">SpaceX </span><span class="verified-badge">
                <picture>
                  <source srcset="/src/assets/icons/webp/verified-badge.webp">
                </picture>
                <img src="/src/assets/icons/png/verified-badge.png" class="badge" alt="Image for subject matter">
              </span>
              <span class="spacex-title-gray">@SpaceX</span>

              <div class="tweet-text-container">
                <p class="tweet-text">${createTextArr(tweetTextArray[0])}</p>
              </div>
            </div>

          </div>

          <div class="tweet-img-container">
            <picture>
              <source srcset="${imageUrl}">
              <img src="${imageUrl}" alt="Image for subject matter">
            </picture>
          </div>

          <div class="tweet-data-container">
            <span class="reply-icon tweet-data-icons">&#128489 ${createCount(
              tweetReplies
            )}</span>
            <span class="retweet-icon tweet-data-icons">&#9850 ${createCount(
              tweetRetweets
            )}</span>
            <span class="favorite-icon tweet-data-icons">&#9825 ${createCount(
              tweetFavorites
            )}</span>
          </div>

        </div>

      </a>`;

    tweetListContainer.innerHTML += tweetTemplate;
  });
};
