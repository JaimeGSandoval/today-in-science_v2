interface IArticle {
  title: string;
  link: string;
  source: Source['title'];
  published_date: Date;
}

export type Source = {
  title: string;
};

export default IArticle;
