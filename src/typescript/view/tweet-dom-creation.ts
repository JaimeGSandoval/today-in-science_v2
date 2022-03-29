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

export const createCount = (count: number): string => {
  if (!count) {
    throw new Error(
      'Count argument is missing. A number for count must be provided.'
    );
  }
  return count.toString();
};

// export const createText = (tweetText: string[]): string => {
//   if (!tweetText) {
//     throw new Error('String argument is missing. A string must be provided.');
//   }

//   return tweetText[0];
// };

// export const createTweetTextArr = (tweetText: string): string[] => {
//   if (!tweetText) {
//     throw new Error('String argument is missing. A string must be provided.');
//   }

//   const array = tweetText.split('https');
//   console.log(array);
//   return array;
// };

// export const createTweetUrl = (textArr: string[]): string => {
//   if (!textArr) {
//     throw new Error(
//       'TextArray argument is missing. An array of strings must be provided.'
//     );
//   }

//   return textArr[textArr.length - 1].slice(1);
// };
