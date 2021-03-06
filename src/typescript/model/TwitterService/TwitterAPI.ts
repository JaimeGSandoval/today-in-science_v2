export default class TwitterAPI {
  private readonly _webSearchApiKey: string;

  constructor() {
    this._webSearchApiKey =
      '6bb1f7d518mshee6c717c3746b3ap119550jsned3e9335e862';
  }

  private async _checkResponseData(response: Response): Promise<Response> {
    if (!response) {
      throw new Error('A response must be provided');
    }

    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    }

    return Promise.reject(new Error(response.statusText));
  }

  private async _getJsonContent(response: Response): Promise<unknown> {
    if (!response) {
      throw new Error('A response must be provided');
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

  public async getAllTweets(): Promise<any> {
    const response: Response = await fetch(
      'https://twitter135.p.rapidapi.com/UserTweets/?id=34743251&count=25',
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'twitter135.p.rapidapi.com',
          'x-rapidapi-key':
            '6bb1f7d518mshee6c717c3746b3ap119550jsned3e9335e862',
        },
      }
    );

    const checkedResponse: Response = await this._checkResponseData(response);
    const jsonContent = await this._getJsonContent(checkedResponse);

    return jsonContent;
  }
}
