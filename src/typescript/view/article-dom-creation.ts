export const createTextArr = (title: string): string[] => {
  if (!title) {
    throw new Error(
      'Title is missing. Subject title must be provided as an argument.'
    );
  }

  const array = title.split('-');
  return array;
};

export const createTitle = (textArray: string[]): HTMLHeadingElement => {
  if (!textArray) {
    throw new Error(
      'TextArray is missing. an array of the subject title and subject url must be provided.'
    );
  }

  const h1Element = document.createElement('h1');
  h1Element.textContent = textArray[0];
  return h1Element;
};

export const createSourceText = (textArray: string[]): HTMLParagraphElement => {
  if (!textArray) {
    throw new Error(
      'TextArray is missing. an array of the subject title and subject url must be provided.'
    );
  }

  const paragraphElement = document.createElement('p');
  paragraphElement.textContent = textArray[1].trim();
  return paragraphElement;
};

export const createUrl = (link: string): HTMLAnchorElement => {
  if (!link) {
    throw new Error('Link argument is missing. A url string must be provide.');
  }

  const url = document.createElement('a');
  url.href = link;
  return url;
};

export const createDateText = (date: Date): HTMLParagraphElement => {
  const dateString = date.toDateString();
  if (!date) {
    throw new Error('Date string is missing. A date must be provided.');
  }

  const paragraphElement = document.createElement('p');
  paragraphElement.textContent = dateString;
  return paragraphElement;
};

export const createIcon = (): HTMLImageElement => {
  const imgElement = document.createElement('img');
  imgElement.src = '/src/assets/icons/webp/astronaut.webp';
  return imgElement;
};

function sourceChange(subject: string) {
  if (!subject) {
    throw new Error(
      'Subject argument is missing. A path to the image source must be provided.'
    );
  }

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

const articleSubjects = document.querySelectorAll('h1');
articleSubjects.forEach((subject) => {
  subject.addEventListener('click', function (e) {
    const target = e.target as HTMLHeadingElement;
    return sourceChange(target.id);
  });
});
