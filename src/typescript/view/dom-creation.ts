export const createTextArr = (title: string) => {
  const array = title.split('-');
  return array;
};

export const createTitle = (title: string): HTMLHeadingElement => {
  const h1 = document.createElement('h1');
  h1.textContent = title;
  return h1;
};

export const createSourceText = (): HTMLParagraphElement => {
  const text = document.createElement('p');
  return text;
};
