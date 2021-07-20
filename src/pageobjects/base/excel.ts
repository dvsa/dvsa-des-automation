import { Workbook, Worksheet, Row, Cell, CellValue } from 'exceljs';
import path from 'path';

class ExcelReader {

    readonly FILESPATH = './excelfiles/';

    constructor() {

    }

    public async jsonFromXLFile(file: string, sheetname:string): Promise<any> {
        const fullpath = path.resolve(`${this.FILESPATH}${file}`);
        const wb: Workbook = new Workbook();

        await wb.xlsx.readFile(fullpath);

        const sheet: Worksheet = wb.getWorksheet(sheetname);
        const dataArray = this.changeRowsToDict(sheet);

        return JSON.stringify(dataArray);
    }

    private changeRowsToDict(worksheet: Worksheet) {
        let dataArray: any = [];
        let keys: any = [];

        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber == 1) {
                keys = row.values;
            }
            else {
                let rowDict: object = this.cellValueToDict(keys, row);
                dataArray.push(rowDict);
            }
        });
        return dataArray;
    }

    private cellValueToDict(keys: any, row: any): object {
        let data = {};
        row.eachCell(function (cell: any, colNumber: any) {
            var value = cell.value;
            if (typeof value == "object") value = value.text;
            data[keys[colNumber]] = value;
        });
        return data;
    }
}

export default new ExcelReader()