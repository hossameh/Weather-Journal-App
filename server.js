// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const port=5000;
const express = require('express');
const cors = require('cors');
const bodyParser=require('body-parser');
// Start up an instance of app
const app=express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
const server= app.listen(port,callbackListener);

// Setup Server
function callbackListener()
{
    console.log('Server Started at port '+port);
}