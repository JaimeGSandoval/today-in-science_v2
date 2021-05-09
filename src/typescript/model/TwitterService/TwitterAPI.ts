export default class TwitterAPI {
  private readonly _webSearchApiKey: string;

  constructor() {
    this._webSearchApiKey =
      '6bb1f7d518mshee6c717c3746b3ap119550jsned3e9335e862';
  }

  private async _checkResponseData(response: Response): Promise<Response> {
    if (!response) {
      throw new Error('A response must be provided!');
    }
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    } else {
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
    } catch (error) {
      console.error('Failed to parse the response as JSON: ', error);
      throw new Error(
        `Could not parse the response body as JSON. Error: ${error.message}`
      );
    }
    return jsonContent;
  }

  // SpaceX
  // 34743251
  public async getAllTweets(): Promise<any> {
    const response: Response = await fetch(
      'https://twitter32.p.rapidapi.com/getTweets?user_id=34743251',
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key':
            '6bb1f7d518mshee6c717c3746b3ap119550jsned3e9335e862',
          'x-rapidapi-host': 'twitter32.p.rapidapi.com',
        },
      }
    );
    const checkedResponse: Response = await this._checkResponseData(response);
    const jsonContent = await this._getJsonContent(checkedResponse);
    return jsonContent;
  }
}
