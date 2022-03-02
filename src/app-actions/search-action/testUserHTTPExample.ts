import { ChuckNorrisApi } from '../../pageobjects/search/api/api.chucknorris';
import { GenericApi } from '../../pageobjects/search/api/api.generic';

export default async (
  endpoint: string,
) => {
  console.log(endpoint);

  // const cnApi =  ChuckNorrisApi.getInstance();
  const httpClient = GenericApi.getInstance(endpoint);

  // console.log(await cnApi.getRandom());
  console.log(await httpClient.getData());

  // Do more testing here
  // Maybe loop though some data that came back from the endpoint and do a test with it
};
