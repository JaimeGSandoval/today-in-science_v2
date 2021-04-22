import ArticleList from "./articleList";

export default interface IArticleAPI {
  getAllArticles(): Promise<ArticleList>;
}
