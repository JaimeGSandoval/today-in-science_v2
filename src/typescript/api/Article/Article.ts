import IArticle from './IArticle.intf';
import Source from './IArticle.intf';

class Article implements IArticle {
  public title: string;
  public link: string;
  public source: Source['title'];
  public published_date: Date;

  constructor(
    title: string,
    link: string,
    source: Source['title'],
    published_date: Date
  ) {
    this.title = title;
    this.link = link;
    this.source = source;
    this.published_date = published_date;
  }
}

export default Article;
