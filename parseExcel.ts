import * as XLSX from 'xlsx';
import { parse, format } from 'date-fns';

const readExcelFile = (filePath: string) => {

  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];


  const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false }); 
  const jsonData = rawData.slice(1).map((row: any) => {
    if (!row[0] || !row[1]) return null; 
    const fullName = row[1].split(' ');
    const firstName = fullName.shift(); 
    const lastName = fullName.join(' '); 


    const flightDate = parse(row[0], 'dd.MM.yyyy', new Date());
    const formattedDate = format(flightDate, 'yyyy-MM-dd');

    return {
      FIRST_NAME: firstName || "",
      LAST_NAME: lastName || "",
      PHONE_NUMBER: row[7] ? row[7].replace(/\D/g, '') : "", 
      EMAIL: row[8] || "",
      BOOKING_NUMBER: row[6] || "",
      BOARDING_AIRPORT: row[2] ? row[2].split('-')[0].trim() : "",
      DESTINATION_AIRPORT: row[2] ? row[2].split('-')[1].trim() : "",
      AIRLINE_NAME: row[3] || "",
      FLIGHT_NUMBER: row[4] || "",
      FLIGHT_DATE: formattedDate 
    };
  }).filter(item => item); 

 
  console.log(JSON.stringify(jsonData, null, 2));
};


readExcelFile('./batch.xlsx');
