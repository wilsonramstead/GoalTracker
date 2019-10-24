const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

require('./routes')(app);

app.use(express.static( __dirname + '/public/dist/public'));

app.listen(8000, function(err) {
    if(err) {
        console.log("Error: ", err);
    } else {
        console.log("Running on port 8000");
    }
})
