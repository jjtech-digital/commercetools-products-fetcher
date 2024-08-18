const fs = require('fs');
const path = require('path');
const { json2csv } = require('json-2-csv');

const jsonFilePath = path.join(__dirname, 'productProjections.json');
const csvFilePath = path.join(__dirname, 'csv-products.csv');

async function convertJsonToCsv() {
  try {
    const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));

    const csvData = await json2csv(jsonData);


    fs.writeFileSync(csvFilePath, csvData);

    console.log(`Converted ${path.basename(jsonFilePath)} to ${path.basename(csvFilePath)}`);
  } catch (error) {
    console.error('Error converting JSON to CSV:', error);
  }
}

convertJsonToCsv();
