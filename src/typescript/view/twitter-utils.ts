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
