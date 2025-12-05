// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

//IMESTAMP API ENDPOINT

app.get("/api/:date?", function(req, res){
  let dateInput = req.params.date;
  let dateObject;
  //check if the date parameter is empty
  //Result: Return the curren time
  if(!dateInput) {
    dateObject = new Date();
  }else {
    //Check if the input is a number(UNIX Timestamp)
    //Note: Numbers in params are strings, so "1451001600000" needs to be checked
    if (!isNaN(dateInput)) {
      //IT's a number! Convert it to an integer first.
      dateObject = new Date(parseInt(dateInput));
    }else{
      //It's a string(e.g. , "2025-12-06")
      dateObject = new Date(dateInput);
    }
  }

  //Validate the Date
  //If the date is invalid, Date.toString() returns "Invalid Date"
  if (dateObject.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    //Success. Return Unix and UTC formats
    res.json({
      unix: dateObject.getTime(),
      utc: dateObject.toUTCString()
    });
  }

}
);

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
