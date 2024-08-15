
const { createClient } = require('@commercetools/sdk-client');
const { createHttpMiddleware } = require('@commercetools/sdk-middleware-http');
const { createAuthMiddlewareForClientCredentialsFlow } = require('@commercetools/sdk-middleware-auth');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const projectKey=  process.env.CTP_PROJECT_KEY
const clientId=  process.env.CTP_CLIENT_ID
const clientSecret = process.env.CTP_CLIENT_SECRET
const authUrl = process.env.CTP_AUTH_URL 
const apiUrl = process.env.CTP_API_URL 
const scopes = process.env.CTP_SCOPES 

const client = createClient({
    middlewares: [
      createAuthMiddlewareForClientCredentialsFlow({
        host: authUrl,
        projectKey,
        credentials: {
          clientId,
          clientSecret,
        },
      }),
      createHttpMiddleware({
        host: apiUrl,
      }),
    ],
  });
  
  async function exportProducts() {
    const limit = 100;
    let lastProductId = '';
    let withTotal = true;
    let totalProducts = 0;
    let firstIteration = true;
  
    try {
      const outputPath = path.join(__dirname, 'productProjections.json');
  
      fs.writeFileSync(outputPath, '[');
  
      while (true) {
        let uri = `/${projectKey}/product-projections?limit=${limit}&sort=id asc&withTotal=${withTotal}`;
        if (lastProductId) {
          uri += `&where=id > "${lastProductId}"`;
        }
  
        const response = await client.execute({
          uri: uri,
          method: 'GET',
        });
  
        const products = response.body.results;
  
        if (firstIteration) {
          totalProducts = response.body.total;
          console.log(`Total number of products: ${totalProducts}`);
          firstIteration = false;
        }
  
        console.log(`Fetched ${products.length} products. Last Product ID: ${lastProductId}`);
  
        if (products.length === 0) break;
  
        if (lastProductId) {
          fs.appendFileSync(outputPath, ',\n');
        }
  
        fs.appendFileSync(outputPath, JSON.stringify(products, null, 2).slice(1, -1));
  
        lastProductId = products[products.length - 1].id;
        withTotal = false;
  
        if (products.length < limit) break;
      }
  
      fs.appendFileSync(outputPath, '\n]');
  
      console.log('Product projections have been saved to productProjections.json');
    } catch (error) {
      console.error('Error exporting product projections:', error);
    }
  }
  
  exportProducts();
