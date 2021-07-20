import { HttpClient } from '../../../support/classes/httpclient/httpclient'

export class SWAPIApi extends HttpClient {
  private static classInstance?: SWAPIApi;

  private constructor() {
    super('https://swapi.dev/api/');
    console.log('constructor being used');
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new SWAPIApi();
    }

    return this.classInstance;
  }
  
  public getPerson = (id:string) => this.instance.get<any[]>(`people/${id}`);
  public getPlanet = (id:string) => this.instance.get<any[]>(`planets/${id}`);
  public getFilm = (id:string) => this.instance.get<any[]>(`films/${id}`);

}


