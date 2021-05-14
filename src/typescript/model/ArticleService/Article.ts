export default class Article {
  public readonly title: string;
  public readonly link: string;
  public readonly source: any;
  public readonly published_date: Date;

  constructor(title: string, link: string, source: any, published_date: Date) {
    this.title = title;
    this.link = link;
    this.source = source;
    this.published_date = new Date(published_date);
  }
}
