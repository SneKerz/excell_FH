"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var XLSX = __importStar(require("xlsx"));
var date_fns_1 = require("date-fns");
var readExcelFile = function (filePath) {
  
    var workbook = XLSX.readFile(filePath);
    var sheetName = workbook.SheetNames[0];
    var sheet = workbook.Sheets[sheetName];
    var rawData = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false }); 
    var jsonData = rawData.slice(1).map(function (row) {
        if (!row[0] || !row[1])
            return null; 
        var fullName = row[1].split(' ');
        var firstName = fullName.shift(); 
        var lastName = fullName.join(' '); 
  
        var flightDate = (0, date_fns_1.parse)(row[0], 'dd.MM.yyyy', new Date());
        var formattedDate = (0, date_fns_1.format)(flightDate, 'yyyy-MM-dd');
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
    }).filter(function (item) { return item; }); 
   
    console.log(JSON.stringify(jsonData, null, 2));
};

readExcelFile('./batch.xlsx');
