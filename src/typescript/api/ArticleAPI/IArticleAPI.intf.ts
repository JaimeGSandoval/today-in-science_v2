/* eslint-disable no-unused-vars */
interface IArticleAPI {
  checkResponseData(response: Response): Promise<Response>;
  getJsonContent(response: Response): Promise<unknown>;
  getAllArticles(): Promise<any>;
}

export default IArticleAPI;
