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

export const createTweetDomElements = (tweets: Tweet[]) => {
  const tweetContainer = document.getElementById(
    'tweet-container'
  ) as HTMLDivElement;

  tweets.forEach((tweet: Tweet) => {
    const container = document.createElement('div') as HTMLDivElement;

    const tweetImg = document.createElement('img') as HTMLImageElement;
    tweetImg.src = tweet.image_url;
    tweetImg.style.width = '400px';
    tweetImg.style.height = 'auto';

    const fullText = document.createElement('p') as HTMLParagraphElement;
    fullText.textContent = tweet.full_text;

    const tweetText = fullText.textContent.split('https');

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
      tweetText[0],
      replyCount,
      retweetCount,
      favoriteCount
    );

    twitterPostUrl.append(container);
    tweetContainer.appendChild(twitterPostUrl);
  });
};

// const result: string[] = [];
// tweetText.textContent?.split(' ').forEach((word) => {
//   const temp = document.createElement('span');
//   temp.textContent = word;
//   if (word.startsWith('#') || word.startsWith('@')) {
//     word.style.color = 'blue';
//   }
//   result.push(word);
// });
// tweetText.textContent = result.join(' ');

// tweetText[0].split(' ').forEach((word) => {
//   const span = document.createElement('span');
//   span.innerText = word;

//   if (span.innerText.startsWith('@') || span.innerText.startsWith('#')) {
//     span.style.color = 'blue';
//     document.body.append(span);
//   }
// });
