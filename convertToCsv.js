const fs = require('fs');
const path = require('path');
const { Parser } = require('json2csv');

const jsonFilePath = path.join(__dirname, 'productProjections.json');
const csvFilePath = path.join(__dirname, 'csv-products.csv');

function convertJsonToCsv() {
  const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));

  const json2csvParser = new Parser();
  const csvData = json2csvParser.parse(jsonData);

  fs.writeFileSync(csvFilePath, csvData);

  console.log(`Converted ${path.basename(jsonFilePath)} to ${path.basename(csvFilePath)}`);
}

convertJsonToCsv();
