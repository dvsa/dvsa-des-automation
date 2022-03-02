import { SWAPIApi } from '../../pageobjects/search/api/api.swapi';

export default async (
  type: 'person' | 'planet' | 'film',
  id: string,
) => {
  const httpClient = SWAPIApi.getInstance();

  switch (type) {
    case 'person':
      console.log(await httpClient.getPerson(id));
      break;
    case 'planet':
      console.log(await httpClient.getPlanet(id));
      break;
    case 'film':
      console.log(await httpClient.getFilm(id));
      break;
  }
};
