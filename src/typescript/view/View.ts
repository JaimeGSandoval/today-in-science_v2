import { Article } from '../model/ArticleService';
import { Tweet } from '../model/TwitterService';
import {
  createTitle,
  createTextArr,
  createSourceText,
  createUrl,
  createDateText,
  createIcon,
} from './article-dom-creation';
import {
  createImgUrl,
  colorizeSelectedText,
  createText,
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

    newArticles = newArticles.sort((a, b) => {
      return b.published_date.getTime() - a.published_date.getTime();
    });

    return createArticleDomElements(newArticles);
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
    const date: Date = article.published_date;

    const articleContainer = document.createElement('div') as HTMLDivElement;
    const articleTextArr: string[] = createTextArr(title);
    const articleTitle = createTitle(articleTextArr) as HTMLParagraphElement;
    const articleSource = createSourceText(
      articleTextArr
    ) as HTMLParagraphElement;
    const articleUrl = createUrl(link) as HTMLAnchorElement;
    const articleDate = createDateText(date) as HTMLParagraphElement;
    const icon = createIcon() as HTMLImageElement;

    articleContainer.append(articleTitle, articleSource, articleDate, icon);

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
    const tweetReplies: number = tweet.reply_count;
    const tweetRetweets: number = tweet.retweet_count;
    const tweetFavorites: number = tweet.favorite_count;

    const tweetImg = createImgUrl(imageUrl) as HTMLImageElement;
    const coloredText: string = colorizeSelectedText(tweetFullText);
    const tweetText = createText(coloredText) as HTMLParagraphElement;
    const tweetTextArray: string[] = createTweetTextArr(tweetText);
    const urlString: string = createTweetUrl(tweetTextArray);
    const twitterPostUrl = createUrl(urlString) as HTMLAnchorElement;
    const replyCount = createCount(tweetReplies) as HTMLSpanElement;
    const retweetCount = createCount(tweetRetweets) as HTMLSpanElement;
    const favoriteCount = createCount(tweetFavorites) as HTMLSpanElement;

    tweetsContainer.append(
      tweetImg,
      tweetText,
      replyCount,
      retweetCount,
      favoriteCount
    );

    twitterPostUrl.append(tweetsContainer);
    return tweetListContainer.appendChild(twitterPostUrl);
  });
};
