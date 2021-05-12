export const createTextArr = (title: string): string[] => {
  const array = title.split('-');
  return array;
};

export const createTitle = (textArray: string[]): HTMLHeadingElement => {
  const h1Element = document.createElement('h1');
  h1Element.textContent = textArray[0];
  return h1Element;
};

export const createSourceText = (textArray: string[]): HTMLParagraphElement => {
  const paragraphElement = document.createElement('p');
  paragraphElement.textContent = textArray[1].trim();
  return paragraphElement;
};

export const createUrl = (link: string): HTMLAnchorElement => {
  const url = document.createElement('a');
  url.href = link;
  return url;
};

export const createDateText = (date: string): HTMLParagraphElement => {
  const paragraphElement = document.createElement('p');
  paragraphElement.textContent = date;
  return paragraphElement;
};

export const createIcon = (): HTMLImageElement => {
  const imgElement = document.createElement('img');
  imgElement.src = '/src/assets/icons/webp/astronaut.webp';
  return imgElement;
};

export const appendToArticleContainer = (
  articleContainer: HTMLDivElement,
  ...articleElements: HTMLElement[]
) => {
  return articleContainer.append(...articleElements);
};
