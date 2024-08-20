# Fetching Products made easy

## Fetch all products from commercetools and convert it into csv file just by simple cli commands


Step 1. Clone the project
Step 2. Download required packages

            npm install

Step 3. Add environment variables for identifying client.
  - Create a .env file in root directory and add these api client variables :

          CTP_PROJECT_KEY=
          CTP_CLIENT_ID=
          CTP_CLIENT_SECRET=
          CTP_AUTH_URL=
          CTP_API_URL=
          CTP_SCOPES=

  - Add your service account json file data inside .env file also : 
          
            type=
            project_id=
            private_key_id=
            private_key=
            client_email=
            client_id=
            auth_uri=
            token_uri=
            auth_provider_x509_cert_url=           
            client_x509_cert_url=
            universe_domain=

  - Add your google sheet id in .env :

            spreadSheetId=


 - Save the file


Step 4. For fetching all the products from commercetools, run this command in your terminal 
         
         npm run export

         this will create a file called productProjection in .json extension
You will be able to see the progress of fetching in your terminal🚀


Step 5. For pushing this data to google sheet, run this command in your terminal 
         
         npm run push

         this will push all the products data inside productProjection in your google sheet, check your sheet for confirmation
You will be able to see the progress of fetching in your terminal🚀


Step 6. For converting the fetched data, run this command in your terminal 

         npm run convert

         this will create a file called csv-products in .csv extension
Export this file or use it in any way you like.


Thanks for choosing our small application!!

