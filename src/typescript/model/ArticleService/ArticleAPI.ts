export default class ArticleAPI {
  private readonly _webSearchApiKey: string;

  constructor() {
    this._webSearchApiKey =
      '6bb1f7d518mshee6c717c3746b3ap119550jsned3e9335e862';
  }

  private _handleErrorMessage() {
    const articleContainer = document.getElementById('main');
    const errorText = document.createElement('p');
    errorText.textContent =
      'An error has occurred retrieving data. Please try again.';
    errorText.classList.add('error-text');
    articleContainer?.appendChild(errorText);
  }

  private async _checkResponseData(response: Response): Promise<Response> {
    if (!response) {
      throw new Error('A response must be provided!');
    }
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    } else {
      this._handleErrorMessage();
      return Promise.reject(new Error(response.statusText));
    }
  }

  private async _getJsonContent(response: Response): Promise<unknown> {
    if (!response) {
      throw new Error('A response must be provided!');
    }
    let jsonContent: unknown = undefined;

    try {
      jsonContent = await response.json();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Failed to parse the response as JSON: ', error);
        throw new Error(
          `Could not parse the response body as JSON. Error: ${error.message}`
        );
      }
    }
    return jsonContent;
  }

  public async getAllArticles(subject: string | undefined): Promise<any> {
    const response: Response = await fetch(
      `https://google-news1.p.rapidapi.com/search?q=${subject}&country=US&lang=en&limit=30`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key': this._webSearchApiKey,
          'x-rapidapi-host': 'google-news1.p.rapidapi.com',
        },
      }
    );

    const checkedResponse: Response = await this._checkResponseData(response);
    const jsonContent = await this._getJsonContent(checkedResponse);
    return jsonContent;
  }
}
