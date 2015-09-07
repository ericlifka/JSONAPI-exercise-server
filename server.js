/* global process */
require("babel/register");

var PORT = process.env[ 'SERVER_PORT' ] || 8080;
var app = require('./app/app.js');

app.listen(PORT, function (error) {
  if (error) {
    console.error("Error starting server: " + error);
  } else {
    console.info("Server listening on port: " + PORT);
  }
});
