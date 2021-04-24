interface IArticleList {
  articles: [];
}

class ArticleList implements IArticleList {
  articles: [];
  constructor(articles: []) {
    this.articles = articles;
  }
}

export default ArticleList;
