var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var jsonFile = require('jsonfile');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/webGame1.html'));
});

app.get('/gameload', function(req, res) {
	var loadId = req.query.loadId;
	jsonFile.readFile("./saveData.json", function(err, obj){
		if (err) throw err;
		var parseData = JSON.parse(obj);
		console.log("parseData : " + parseData);
		console.log(parseData.saveId);
		if(loadId === parseData.saveId)
			res.send(parseData);
		else
			res.send('0');
		res.end();
	});	
});

app.post('/gamesave', function(req, res){
	console.log("Data : ", req.body);
	
	var jsonData = JSON.stringify(req.body);	
	console.log("jsonData : ", jsonData);
	jsonFile.writeFile("./saveData.json", jsonData, function(err) {
		if (err) throw err;
		console.log('complete');
		res.end('1');
	});
});

app.listen(3001);



