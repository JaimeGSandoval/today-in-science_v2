import IArticleAPI from './IArticleAPI.intf';
import Article from '../Article/Article';
import ArticleList from '../ArticleList/ArticleList';
const webSearchApiKey = '6bb1f7d518mshee6c717c3746b3ap119550jsned3e9335e862';

class ArticleAPI implements IArticleAPI {
  async checkResponseData(response: Response): Promise<Response> {
    if (!response) {
      throw new Error('A response must be provided!');
    }
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }

  async getJsonContent(response: Response): Promise<unknown> {
    if (!response) {
      throw new Error('A response must be provided!');
    }
    let jsonContent: unknown = undefined;

    try {
      jsonContent = await response.json();
    } catch (error) {
      console.error('Failed to parse the response as JSON: ', error);
      throw new Error(
        `Could not parse the response body as JSON. Error: ${error.message}`
      );
    }
    return jsonContent;
  }

  async getAllArticles(): Promise<any> {
    const response: Response = await fetch(
      'https://google-news1.p.rapidapi.com/search?q=Astronomy&lang=en&pageSize=30',
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key': webSearchApiKey,
          'x-rapidapi-host': 'google-news1.p.rapidapi.com',
        },
      }
    );
    const checkedResponse: Response = await this.checkResponseData(response);
    const jsonContent = await this.getJsonContent(checkedResponse);
    return jsonContent as ArticleList[];
  }
}

const apiClient = new ArticleAPI();

apiClient.getAllArticles().then((data) => {
  const retrievedArticles = data.articles.slice(0, 30);
  retrievedArticles.forEach((article: Article) => {
    const newArticle = new Article(
      article.title,
      article.link,
      article.source,
      article.published_date
    );
    console.log(newArticle);
  });
});

export default ArticleAPI;
