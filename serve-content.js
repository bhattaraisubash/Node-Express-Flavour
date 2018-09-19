/**
*serves static content placed under public directory
*@author Subash Bhattarai
*/

var express = require('express');
var app = express();

var bodyParser = require('body-parser');

//x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(express.static('public'));

app.get(['/', '/login'], function(req, res){
    res.sendFile(__dirname + '/index.html');
})

//handle login post request
app.post('/login', urlencodedParser, function(req, res){
    response = {
        username: req.body.username,
        password: req.body.password
    };
    console.log(response);
    res.end(JSON.stringify(response));
})

var server = app.listen(8080, function(){
    console.log("server running on port:%s", server.address().port);
})
