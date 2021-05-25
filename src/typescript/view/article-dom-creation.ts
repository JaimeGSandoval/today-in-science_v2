export const createTextArr = (title: string): string[] => {
  if (!title) {
    throw new Error(
      'Title is missing. Subject title must be provided as an argument.'
    );
  }

  const array = title.split('-');
  return array;
};

export const createUrl = (link: string): string => {
  if (!link) {
    throw new Error('Link argument is missing. A url string must be provide.');
  }
  return link;
};

export const createDateText = (date: Date): string => {
  const dateString = date.toDateString();
  if (!date) {
    throw new Error('Date string is missing. A date must be provided.');
  }

  return dateString;
};

export const createIcon = (): HTMLImageElement => {
  const imgElement = document.createElement('img');
  imgElement.src = '/src/assets/icons/webp/astronaut.webp';
  return imgElement;
};

export const sourceChange = (subject: string): void => {
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
  sourceWebpImg.srcset = `/src/assets/images/mobile/webp/${subject}.webp`;
};

const articleSubjects = document.querySelectorAll('.sidenav-link');
export let tempSubject: any = 'Artificial Intelligence';

articleSubjects.forEach((subject) => {
  subject.addEventListener('click', function (e) {
    const target = e.target as HTMLAnchorElement;
    tempSubject = target.textContent;
    return sourceChange(target.id);
  });
});
