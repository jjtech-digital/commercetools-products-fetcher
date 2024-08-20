const { google } = require('googleapis');
const fs = require('fs');
require('dotenv').config();

// const credentials = JSON.parse(fs.readFileSync('service.json'));
// console.log(credentials)

const credentials = {
    type : process.env.type,
    project_id : process.env.project_id, 
    private_key_id : process.env.private_key_id,
    private_key : process.env.private_key,
    client_email : process.env.client_email,
    client_id : process.env.client_id,
    auth_uri : process.env.auth_uri,
    token_uri : process.env.token_uri,
    auth_provider_x509_cert_url : process.env.auth_provider_x509_cert_url,
    client_x509_cert_url : process.env.client_x509_cert_url,
    universe_domain : process.env.universe_domain
}


const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

const spreadsheetId = process.env.spreadSheetId;

const range = 'Sheet1!A1';

const jsonData = JSON.parse(fs.readFileSync('productProjections.json'));

const data = jsonData.map(item => [
  item.productCode,
  item.variantKey,
  item.name.en,
  item.name.de,
]);

data.unshift(['productCode', 'variantKey', 'name (en)', 'name (de)']);

const resource = {
  values: data,
};

async function updateSheet() {
  try {
    const response = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      resource,
    });
    console.log('Sheet updated:', response.data);
  } catch (error) {
    console.error('Error updating sheet:', error);
  }
}

updateSheet();
