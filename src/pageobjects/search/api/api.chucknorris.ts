import { HttpClient } from '../../../support/classes/httpclient/httpclient'

export class ChuckNorrisApi extends HttpClient {
  private static classInstance?: ChuckNorrisApi;

  private constructor() {
    super('https://api.chucknorris.io/jokes');
    console.log('constructor being used');
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new ChuckNorrisApi();
    }

    return this.classInstance;
  }
  
  public getRandom = () => this.instance.get<any[]>('/random');
}


