export const createImgUrl = (url: string): HTMLImageElement => {
  const imgElement = document.createElement('img');
  imgElement.src = url;
  imgElement.style.width = '400px';
  imgElement.style.height = 'auto';
  return imgElement;
};

export const colorizeSelectedText = (tweetText: string): string => {
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

export const createText = (tweetText: string): HTMLParagraphElement => {
  const paragraphElement = document.createElement('p');
  paragraphElement.innerHTML = tweetText;
  return paragraphElement;
};

export const createTweetTextArr = (tweetText: any) => {
  const textArr = tweetText.textContent.split('https');
  return textArr;
};

export const createTweetUrl = (textArr: string[]): string => {
  return textArr[textArr.length - 1].slice(1);
};
