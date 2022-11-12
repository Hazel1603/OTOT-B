// FileName: index.js

// Import express
let express = require('express')
const functions = require('@google-cloud/functions-framework');

// Initialize the app
let app = express();

// Setup server port
var port = process.env.PORT || 8003;

// Register an HTTP function with the Functions Framework that will be executed
// when you make an HTTP request to the deployed function's endpoint.
functions.http('helloGET', (req, res) => {
  res.send('Hello World!');
});

// Send message for default URL
app.get('/test', (req, res) => res.send('Hello World with Express and Nodemon'));

// Launch app to listen to specified port
app.listen(port, function () {
     console.log("Running Backend on port " + port);
});

// Import routes
let apiRoutes = require("./api-routes")

// Use Api routes in the App
app.use('/api', apiRoutes)

// Import Body parser
// let bodyParser = require('body-parser');

// Import Mongoose
let mongoose = require('mongoose');

// Configure bodyparser to handle post requests
// app.use(bodyParser.urlencoded({
//    extended: true
// }));

// app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/OTOT-B');
var db = mongoose.connection;

module.exports = app;