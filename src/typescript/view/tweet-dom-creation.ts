export const createImgUrl = (url: string): HTMLImageElement => {
  const imgElement = document.createElement('img') as HTMLImageElement;
  imgElement.src = url;
  imgElement.style.width = '400px';
  imgElement.style.height = 'auto';
  return imgElement;
};

export const colorizeSelectedText = (tweetText: string): string => {
  if (!tweetText) {
    throw new Error('String argument is missing. A string must be provided.');
  }

  const result = tweetText
    .split(' ')
    .map((word: any) => {
      if (word.startsWith('@') || word.startsWith('#')) {
        return `<span style='color: blue;'>${word}</span>`;
      }
      return word;
    })
    .join(' ');
  return result;
};

export const createText = (tweetText: string[]): HTMLParagraphElement => {
  if (!tweetText) {
    throw new Error('String argument is missing. A string must be provided.');
  }

  const paragraphElement = document.createElement('p');
  paragraphElement.innerHTML = tweetText[0];
  return paragraphElement;
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

export const createCount = (count: number): HTMLSpanElement => {
  if (!count) {
    throw new Error(
      'Count argument is missing. A number for count must be provided.'
    );
  }

  const span = document.createElement('span');
  span.textContent = count.toString();
  return span;
};
