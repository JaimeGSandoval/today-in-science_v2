import { Article } from '../model/ArticleService';
import { Tweet } from '../model/TwitterService';

export default class View {
  public createArticles(articles: Article[]) {
    // console.log(
    //   articles.published_date.sort(function (a: any, b: any) {
    //     return a - b;
    //   })
    // );
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

const createArticleDomElements = (articles: Article[]) => {
  const container = document.getElementById(
    'article-container'
  ) as HTMLDivElement;

  articles.forEach((article: Article) => {
    const title: string = article.title;
    const link: string = article.link;
    const date: string = new Date(article.published_date).toDateString();

    const div = document.createElement('div') as HTMLDivElement;
    const h1 = document.createElement('h1') as HTMLHeadingElement;
    h1.textContent = title;

    const test = h1.textContent.split('-') as string[];
    h1.textContent = test[0];

    const sourceText = document.createElement('p') as HTMLParagraphElement;
    sourceText.textContent = test[1];

    const url = document.createElement('a') as HTMLAnchorElement;
    url.setAttribute('href', link);

    const dateStr = document.createElement('p') as HTMLParagraphElement;
    dateStr.textContent = date;

    const icon = document.createElement('img') as HTMLImageElement;
    icon.src = '/src/assets/icons/webp/astronaut.webp';

    div.append(h1, sourceText, dateStr, icon);
    url.appendChild(div);
    return container?.appendChild(url);
  });
};

const createTweetDomElements = (tweets: Tweet[]) => {
  const tweetContainer = document.getElementById(
    'tweet-container'
  ) as HTMLDivElement;

  tweets.forEach((tweet: Tweet) => {
    const container = document.createElement('div') as HTMLDivElement;

    const tweetImg = document.createElement('img') as HTMLImageElement;
    tweetImg.src = tweet.image_url;
    tweetImg.style.width = '400px';
    tweetImg.style.height = 'auto';

    const test = tweet.full_text;
    const result = colorizeSelectedText(test);

    const fullText = document.createElement('p') as HTMLParagraphElement;
    fullText.innerHTML = result;

    const tweetText = fullText.textContent!.split('https');
    document.body.append(fullText);

    const tempUrlVar = tweetText[tweetText.length - 1].slice(1);

    const twitterPostUrl = document.createElement('a') as HTMLAnchorElement;
    twitterPostUrl.setAttribute('href', tempUrlVar);
    twitterPostUrl.innerText = 'URL';

    const replyCount = document.createElement('span') as HTMLSpanElement;
    replyCount.textContent = String(tweet.reply_count);

    const retweetCount = document.createElement('span') as HTMLSpanElement;
    retweetCount.textContent = String(tweet.retweet_count);

    const favoriteCount = document.createElement('span') as HTMLSpanElement;
    favoriteCount.textContent = String(tweet.favorite_count);

    container.append(
      tweetImg,
      fullText,
      replyCount,
      retweetCount,
      favoriteCount
    );

    twitterPostUrl.append(container);
    tweetContainer.appendChild(twitterPostUrl);
  });
};

function colorizeSelectedText(str: any) {
  const result = str
    .split(' ')
    .map((word: any) => {
      if (word.startsWith('@') || word.startsWith('#')) {
        return `<span style='color: blue;'>${word}</span>`;
      }
      return word;
    })
    .join(' ');
  return result;
}

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

const subjects = document.querySelectorAll('h1');
subjects.forEach((subject) => {
  subject.addEventListener('click', function (e) {
    const target = e.target as HTMLHeadingElement;
    return sourceChange(target.id);
  });
});
