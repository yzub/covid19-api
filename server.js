// load up the express framework and body-parser helper
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const cron = require('node-cron');

// create an instance of express to serve our end points
const app = express();

// we'll load up node's built in file system helper library here
// (we'll be using this later to serve our JSON files
const fs = require('fs');

// cron job
cron.schedule("* * * * *", function() {
    const downloadPath = 'data/timeseries.json';
    const file = fs.createWriteStream(downloadPath);
    
    https.get('https://pomber.github.io/covid19/timeseries.json', function(response) {
        response.pipe(file);

        file.on('finish', function() {
            file.close();
            console.log("DONE LOADING");
        })
    }).on('error', function(err) {
        console.log("ERROR" + err.message);
        fs.unlink(downloadPath);
    })
    console.log("running a task every minute");
  });


// configure our express instance with some body-parser settings 
// including handling JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// this is where we'll handle our various routes from
const routes = require('./routes/routes.js')(app, fs);

// finally, launch our server on port 3001.
const server = app.listen(3001, () => {
    console.log('listening on port %s...', server.address().port);
});

