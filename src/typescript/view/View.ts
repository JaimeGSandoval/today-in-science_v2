import { Article } from '../model/ArticleService';
import { Tweet } from '../model/TwitterService';
import {
  createTitle,
  createTextArr,
  createSourceText,
  createUrl,
  createDateText,
  tempSubject,
  // createIcon,
} from './article-dom-creation';
// import {
//   createImgUrl,
//   colorizeSelectedText,
//   createText,
//   createTweetTextArr,
//   createTweetUrl,
//   createCount,
// } from './tweet-dom-creation';

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
    console.log(newTweets);
    // return createTweetDomElements(newTweets);
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
  // const articleListContainer = document.getElementById(
  //   'article-list-container'
  // ) as HTMLDivElement;

  // NEW
  const mainContainer = document.getElementById('main');

  articles.forEach((article: Article) => {
    const title: string = article.title;
    const link: string = article.link;
    const date: Date = article.published_date;

    // REMOVE
    // const articleContainer = document.createElement(
    //   'section'
    // ) as HTMLDivElement;

    // KEEP
    const articleTextArr: string[] = createTextArr(title);

    // CHANGE
    // const articleTitle = createTitle(articleTextArr) as HTMLParagraphElement;
    const articleTitle = createTitle(articleTextArr);

    // CHANGE
    // const articleSource = createSourceText(
    //   articleTextArr
    // ) as HTMLParagraphElement;
    const articleSource = createSourceText(articleTextArr); //string

    // CHANGE
    // const articleUrl = createUrl(link) as HTMLAnchorElement;
    const articleUrl = createUrl(link); // string

    // CHANGE
    // const articleDate = createDateText(date) as HTMLParagraphElement;
    const articleDate = createDateText(date); // string

    //REMOVE
    // const icon = createIcon() as HTMLImageElement;

    // REMOVE
    // articleContainer.append(articleTitle, articleSource, articleDate, icon);

    // articleUrl.appendChild(articleContainer);

    // articleListContainer.appendChild(articleUrl);

    const articleTemplate = `<a href="${articleUrl}" id="article-url" class="article-url">

        <section id="article-container" class="article-container">
          <div id="article-header-container" class="article-header-container">
            <span class="article-header article-text">article &nbsp;|&nbsp;</span>
            <span class="article-header article-subject">${tempSubject} &nbsp;|&nbsp;</span>
            <span class="article-header article-source">${articleSource}</span>
          </div>

          <div id="article-title-container" class="article-title-container">
            <p class="article-title">${articleTitle}</p>
          </div>

          <div class="article-date-container">
            <span class="article-date">${articleDate}</span>

            <span class="astronaut-icon-container">
              <picture>
                <source srcset="/src/assets/icons/webp/astronaut-icon-blue.webp">
                <img src="/src/assets/icons/png/astronaut-icon-blue.png" alt="Astronaut icon">
              </picture>
            </span>
          </div>
        </section>

      </a>`;
    mainContainer!.innerHTML += articleTemplate;
  });
};

// const createTweetDomElements = (tweets: Tweet[]) => {
//   const tweetListContainer = document.getElementById(
//     'tweet-list-container'
//   ) as HTMLDivElement;

//   tweets.forEach((tweet: Tweet) => {
//     const tweetsContainer = document.createElement('div') as HTMLDivElement;
//     const imageUrl: string = tweet.image_url;
//     const tweetFullText: string = tweet.full_text;
//     const tweetReplies: number = tweet.reply_count;
//     const tweetRetweets: number = tweet.retweet_count;
//     const tweetFavorites: number = tweet.favorite_count;

//     const tweetImg = createImgUrl(imageUrl) as HTMLImageElement;
//     const coloredText: string = colorizeSelectedText(tweetFullText);
//     const tweetTextArray: string[] = createTweetTextArr(coloredText);
//     const tweetText = createText(tweetTextArray) as HTMLParagraphElement;
//     const urlString: string = createTweetUrl(tweetTextArray);
//     const twitterPostUrl = createUrl(urlString) as HTMLAnchorElement;
//     const replyCount = createCount(tweetReplies) as HTMLSpanElement;
//     const retweetCount = createCount(tweetRetweets) as HTMLSpanElement;
//     const favoriteCount = createCount(tweetFavorites) as HTMLSpanElement;

//     tweetsContainer.append(
//       tweetImg,
//       tweetText,
//       replyCount,
//       retweetCount,
//       favoriteCount
//     );

//     twitterPostUrl.append(tweetsContainer);
//     return tweetListContainer.appendChild(twitterPostUrl);
//   });
// };
