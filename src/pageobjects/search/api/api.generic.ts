import { HttpClient } from '../../../support/classes/httpclient/httpclient'

export class GenericApi extends HttpClient {
  private static classInstance?: GenericApi;

  private constructor(enpointURL:string) {
    super(enpointURL);
  }

  public static getInstance(enpointURL:string) {
    if (!this.classInstance) {
      this.classInstance = new GenericApi(enpointURL);
    }

    return this.classInstance;
  }

  public getData = () => this.instance.get<any[]>('');

}


