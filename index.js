const express = require('express');
const bodyParser = require('body-parser'); // Require body-parser
const cors = require('cors');
const { configDotenv } = require('dotenv');
require("./db-connection")
//require('./modules/migration')

const app=express();
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  credentials: true, // Allow sending cookies or authorization headers
}));
app.use(bodyParser.json());

require('./db-connection')
const router = require('./routes/router');
app.use(router);

const Nylas = require('nylas');
configDotenv()

Nylas.config({
    clientId: process.env.NYLAS_CLIENT_ID,
    clientSecret: process.env.NYLAS_CLIENT_SECRET,
    apiServer: process.env.NYLAS_API_SERVER,
  });

const CLIENT_URI = "http://localhost:3000/dashboard";
Nylas.application({
  redirectUris: [CLIENT_URI],
}).then((applicationDetails) => {
  console.log(
    'Application registered. Application Details: ',
    JSON.stringify(applicationDetails)
  );
});

// app.post('/nylas/generate-auth-url', express.json(), async (req, res) => {
//     const { body } = req;
  
//     const authUrl = Nylas.urlForAuthentication({
//       loginHint: body.email_address,
//       redirectURI: "http://localhost:3000/dashboard",
//       scopes: [Scope.EmailModify, Scope.EmailSend],
//     });
  
//     return res.send(authUrl);
//   }); 
  
  // app.post('/nylas/exchange-mailbox-token', express.json(), async (req, res) => {
  //   const {body} = req;
  //   console.log(body.token);
  //   try{
  //       const { accessToken, emailAddress } = await Nylas.exchangeCodeForToken(
  //           body.token
  //         );
        
  //         // // Normally store the access token in the DB
  //         console.log('Access Token was generated for: ' + emailAddress);
  //         console.log("Generated Access Token",accessToken);
        
  //         // Replace this mock code with your actual database operations
  //         // const user = await mockDb.createOrUpdateUser(emailAddress, {
  //         //   accessToken,
  //         //   emailAddress,
  //         // });
        
  //         // Return an authorization object to the user
  //         // return res.json({
  //         //   id: user.id,
  //         //   emailAddress: user.emailAddress,
  //         // });
  //         return res.send("deone")
  //   }catch(err){
  //       console.log(err);
  //       return res.send(err)
  //   }
    
  // });

app.listen(8000,()=>{
    console.log("Server running at 8000");
})

