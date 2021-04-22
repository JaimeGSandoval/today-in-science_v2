import ArticleList from './articleList';
import IArticleAPI from './ArticleAPI.intf';
const webSearchApiKey = "6bb1f7d518mshee6c717c3746b3ap119550jsned3e9335e862";

export default class ArticleAPI implements IArticleAPI {

  async checkResponseStatus(response: Response): Promise<Response> {
    if (!response) {
          throw new Error("A response must be provided!");
      }
      if (response.status >= 200 && response.status < 300) {
          return Promise.resolve(response);
      } else {
        return Promise.reject(new Error(response.statusText));
      }
  }

  async getJsonContent(response: Response): Promise<unknown> {
      if (!response) {
        throw new Error("A response must be provided!");
      }
      let jsonContent: unknown = undefined;

      try {
          jsonContent = await response.json();
      } catch (error) {
          console.error("Failed to parse the response as JSON: ", error);
          throw new Error(`Could not parse the response body as JSON. Error: ${error.message}`);
      }
      return jsonContent;
}

  async getAllArticles(): Promise<ArticleList> {
      const response: Response = await fetch('https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?autoCorrect=false&pageNumber=1&pageSize=30&q=astronomy%20cosmology%20articles%202120&safeSearch=false', {
        method: 'GET',
            headers: {
              'x-rapidapi-host': 'contextualwebsearch-websearch-v1.p.rapidapi.com',
              'x-rapidapi-key': webSearchApiKey,
            },
          })
      const checkedResponse: Response = await this.checkResponseStatus(response);
      const jsonContent = await this.getJsonContent(checkedResponse);
      const temp = jsonContent as ArticleList;
      return temp;
      // return jsonContent as ArticleList;
    }
}

const apiClient = new ArticleAPI();
apiClient.getAllArticles().then(articles => {
   articles.value.forEach(item => {
     console.log(item['description'])
   });
});


















// import IArticleAPI from './articleAPI.intf';
// export default class Article implements IArticle {
//   value: Article[];
//   _type: string;
//   description: string;

//   constructor(value: Article[], _type: string, description: string) {
//     this.value = value;
//     this._type = _type;
//     this.description = description;
//   }
// }

// function formatArticle(article: Article): Article {
  //   console.log('ARTICLE BANKAI', article);
  //     return article;
  // }
  // apiClient.getArticles().then(article => formatArticle(article));
