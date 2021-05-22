// export const createImgUrl = (url: string): HTMLImageElement => {
//   const imgElement = document.createElement('img') as HTMLImageElement;
//   imgElement.src = url;
//   imgElement.style.width = '400px';
//   imgElement.style.height = 'auto';
//   return imgElement;
// };

export const createImgUrl = (url: string) => {
  return url;
};

export const colorizeSelectedText = (tweetText: string): string => {
  if (!tweetText) {
    throw new Error('String argument is missing. A string must be provided.');
  }

  const result = tweetText
    .split(' ')
    .map((word: any) => {
      if (word.startsWith('@') || word.startsWith('#')) {
        return `<span style='color: #1DA1F2;'>${word}</span>`;
      }
      return word;
    })
    .join(' ');
  return result;
};

// export const createUrl2 = (link: string): HTMLAnchorElement => {
//   if (!link) {
//     throw new Error('Link argument is missing. A url string must be provide.');
//   }

//   const temp = document.createElement('a');
//   temp.href = 'link';
//   temp.textContent = 'URL';
//   return temp as HTMLAnchorElement;
// };

// export const createText = (tweetText: string[]): HTMLParagraphElement => {
//   if (!tweetText) {
//     throw new Error('String argument is missing. A string must be provided.');
//   }

//   const paragraphElement = document.createElement('p');
//   paragraphElement.innerHTML = tweetText[0];
//   return paragraphElement;
// };

export const createText = (tweetText: string[]) => {
  if (!tweetText) {
    throw new Error('String argument is missing. A string must be provided.');
  }

  return tweetText[0];
};

export const createTweetTextArr = (tweetText: string): string[] => {
  if (!tweetText) {
    throw new Error('String argument is missing. A string must be provided.');
  }

  const array = tweetText.split('https');
  return array;
};

export const createTweetUrl = (textArr: string[]): string => {
  if (!textArr) {
    throw new Error(
      'TextArray argument is missing. An array of strings must be provided.'
    );
  }

  return textArr[textArr.length - 1].slice(1);
};

// export const createCount = (count: number): HTMLSpanElement => {
//   if (!count) {
//     throw new Error(
//       'Count argument is missing. A number for count must be provided.'
//     );
//   }

//   const span = document.createElement('span');
//   span.textContent = count.toString();
//   return span;
// };

export const createCount = (count: number) => {
  if (!count) {
    throw new Error(
      'Count argument is missing. A number for count must be provided.'
    );
  }
  return count.toString();
};
