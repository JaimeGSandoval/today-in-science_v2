import { Article } from '../model/ArticleService';
import { Tweet } from '../model/TwitterService';
import {
  createTitle,
  createTextArr,
  createSourceText,
  createUrl,
  createDateText,
  createIcon,
  appendToArticleContainer,
} from './article-dom-creation';
import {
  createImgUrl,
  colorizeSelectedText,
  createText,
  createTweetTextArr,
  createTweetUrl,
} from './tweet-dom-creation';

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

const createArticleDomElements = (articles: Article[]) => {
  const articleListContainer = document.getElementById(
    'article-list-container'
  ) as HTMLDivElement;

  articles.forEach((article: Article) => {
    const title: string = article.title;
    const link: string = article.link;
    const date: string = new Date(article.published_date).toDateString();

    const articleContainer = document.createElement('div') as HTMLDivElement;
    const articleTextArr: string[] = createTextArr(title);
    const articleTitle = createTitle(articleTextArr) as HTMLParagraphElement;
    const articleSource = createSourceText(
      articleTextArr
    ) as HTMLParagraphElement;
    const articleUrl = createUrl(link) as HTMLAnchorElement;
    const articleDate = createDateText(date) as HTMLParagraphElement;
    const icon = createIcon() as HTMLImageElement;

    appendToArticleContainer(
      articleContainer,
      articleTitle,
      articleSource,
      articleDate,
      icon
    );

    articleUrl.appendChild(articleContainer);
    return articleListContainer.appendChild(articleUrl);
  });
};

const createTweetDomElements = (tweets: Tweet[]) => {
  const tweetListContainer = document.getElementById(
    'tweet-list-container'
  ) as HTMLDivElement;

  tweets.forEach((tweet: Tweet) => {
    const tweetsContainer = document.createElement('div') as HTMLDivElement;
    const imageUrl: string = tweet.image_url;
    const tweetFullText: string = tweet.full_text;

    const tweetImg = createImgUrl(imageUrl) as HTMLImageElement;

    const coloredText: string = colorizeSelectedText(tweetFullText);

    const tweetText = createText(coloredText) as HTMLParagraphElement;

    const tweetTextArray: string[] = createTweetTextArr(tweetText);

    const urlString: string = createTweetUrl(tweetTextArray);

    const twitterPostUrl = document.createElement('a') as HTMLAnchorElement;
    twitterPostUrl.setAttribute('href', urlString);
    twitterPostUrl.innerText = 'URL';

    const replyCount = document.createElement('span') as HTMLSpanElement;
    replyCount.textContent = String(tweet.reply_count);

    const retweetCount = document.createElement('span') as HTMLSpanElement;
    retweetCount.textContent = String(tweet.retweet_count);

    const favoriteCount = document.createElement('span') as HTMLSpanElement;
    favoriteCount.textContent = String(tweet.favorite_count);

    tweetsContainer.append(
      tweetImg,
      tweetText,
      replyCount,
      retweetCount,
      favoriteCount
    );

    twitterPostUrl.append(tweetsContainer);
    tweetListContainer.appendChild(twitterPostUrl);
  });
};

function sourceChange(subject: string) {
  console.log(subject);
  const sourceWebpLg = document.getElementById(
    'source-webp-lg'
  ) as HTMLSourceElement;
  const sourceWebpMd = document.getElementById(
    'source-webp-med'
  ) as HTMLSourceElement;
  const sourceWebpImg = document.getElementById(
    'source-webp-img'
  ) as HTMLImageElement;
  sourceWebpLg.srcset = `/src/assets/images/desktop/webp/${subject}.webp 800w`;
  sourceWebpMd.srcset = `/src/assets/images/tablet/webp/${subject}.webp 600w`;
  sourceWebpImg.src = `/src/assets/images/mobile/webp/${subject}.webp`;
}

const articleSubjects = document.querySelectorAll('h1');
articleSubjects.forEach((subject) => {
  subject.addEventListener('click', function (e) {
    const target = e.target as HTMLHeadingElement;
    return sourceChange(target.id);
  });
});
