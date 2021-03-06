import { Article } from '../model/ArticleService';
import { Tweet } from '../model/TwitterService';
import { createDateText, tempSubject } from './article-utils';
import { colorizeSelectedText, createCount } from './twitter-utils';

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
    const newTweets = tweets.map((tweet) => {
      return new Tweet(
        tweet.image_url,
        tweet.full_text,
        tweet.favorite_count,
        tweet.reply_count,
        tweet.retweet_count,
        tweet.tweet_url
      );
    });

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
  const articleLoaderContainer = document.querySelector(
    '.article-loader-container'
  ) as HTMLDivElement;
  articleLoaderContainer.style.display = 'none';

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
                <source srcset="assets/icons/webp/astronaut-80.webp">
                <img src="assets/icons/png/astronaut-80.png" class="astro-icon" width="30" height="30" alt="Astronaut icon">
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
  const twitterLoaderContainer = document.querySelector(
    '.twitter-loader-container'
  ) as HTMLDivElement;
  twitterLoaderContainer.style.display = 'none';

  tweets.forEach((tweet: Tweet) => {
    const imageUrl: string = tweet.image_url;
    const tweetFullText: string = tweet.full_text;
    const tweetReplies: number = tweet.reply_count;
    const tweetRetweets: number = tweet.retweet_count;
    const tweetFavorites: number = tweet.favorite_count;
    const tweetUrl: string = tweet.tweet_url;
    const coloredDescription: string = colorizeSelectedText(tweetFullText);

    const tweetTemplate: string = `<a href="https${tweetUrl}" class="tweet-url" target="_blank" rel="noopener" rel="noreferrer">
        <div id="tweet-container" class="tweet-container">

          <div class="top-row">
            <div class="spacex-text-container">
              <span class="spacex-title-white">SpaceX </span><span class="verified-badge">
                <picture>
                  <source srcset="assets/icons/webp/verified-badge.webp">
                </picture>
                <img src="assets/icons/png/verified-badge.png" class="badge" alt="Image for subject matter">
              </span>
              <span class="spacex-title-gray">@SpaceX</span>

              <div class="tweet-text-container">
                <p class="tweet-text">${coloredDescription}</p>
              </div>
            </div>

          </div>

          <div class="tweet-img-container">
            <picture>
              <source srcset="${imageUrl}">
              <img src="${imageUrl}" style="width: 100%;" alt="Image for subject matter">
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
