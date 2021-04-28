import IArticle from './IArticle.intf';

export class Article implements IArticle {
  public readonly title: string;
  public readonly link: string;
  public readonly source: any;
  public readonly published_date: Date;

  constructor(title: string, link: string, source: any, published_date: Date) {
    this.title = title;
    this.link = link;
    this.source = source;
    this.published_date = published_date;
  }
}

export const createNewArticle = (articleData: Article): Article => {
  return new Article(
    articleData.title,
    articleData.link,
    articleData.source,
    articleData.published_date
  );
};

export const createArticleDomElements = (article: Article) => {
  const title = document.createElement('h1');
  title.textContent = 'ARTICLE: ' + article.title;
  title.classList.add('nasaText');

  document.body.appendChild(title);
};
