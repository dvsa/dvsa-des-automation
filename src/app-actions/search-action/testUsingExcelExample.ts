import ExcelReader from '../../pageobjects/base/excel';

export default async (
  filename: string,
) => {
  const jsonData = await ExcelReader.jsonFromXLFile(filename, 'Sheet 1');

  console.log(jsonData);

  JSON.parse(jsonData).forEach((row: any) => {
    console.log('Firstname - ', row.Column1);
    console.log('Lastname - ', row.Column2);
    //  Do the test with row.column1 data here
  });

  return true;
};
