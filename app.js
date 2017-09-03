//Basic required imports for NodeJS
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var port = 3000;
//create an instance of express for our app and instantiate bodyParser and cors
var app = module.exports = express();
app.use(bodyParser.json()); 
app.use(cors());

//get call that returns JSON objects
app.get('/:dateVal', function(req, res, next){
	//gets the request data for date
	var dateVal = req.params.dateVal;
	//format the natural date
	var dateFormattingOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	};

	if(isNaN(dateVal)){
		var unixDate = (new Date(dateVal).getTime()/1000);
		unixDate = unixDate + 28800;
		var naturalDate = new Date(dateVal);
		var naturalDate = naturalDate.toLocaleDateString("en-us", dateFormattingOptions);
	} else {
		var unixDate = Number(dateVal);
		var naturalDate = new Date(dateVal * 1000);
			naturalDate = naturalDate.toLocaleDateString("en-us", dateFormattingOptions);
	}

	var json = {
		"unix": unixDate, "natural": naturalDate
	};
	res.json(json);
});


app.listen(port, function(){
	console.log('Connected on port ' + port);
});

/*
var dateobj = new Date();
function pad(n) {return n < 10 ? "0"+n : n;}
var result = pad(dateobj.getDate())+"/"+pad(dateobj.getMonth()+1)+"/"+dateobj.getFullYear();
	
function pad(n){
	if (n < 10){
		return "0"+ n;
	} else {
		return n;
	}
}
var result = pad(naturalDate.getDate()) + "/" + pad(naturalDate.getMonth()+1) + "/" + naturalDate.getFullYear();
*/