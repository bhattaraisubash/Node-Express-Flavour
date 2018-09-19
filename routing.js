/**
*simple routing  example
*@author Subash Bhattarai
*/
var express = require('express')
var app = express();

//handling get request for /, /index , /home
app.get(['/', '/index', '/home'], function(req, res){
    res.send('you are on home page');
    console.log('index mapped');
})

//handling get request for /list-users
app.get('/list-users', function(req, res){
    res.send('you are on user listing page');
    console.log('/list-users mapped');
})

//handling post request for /create-user
app.post('/create-user', function(req, res){
    res.send('you are on user creation page');
    console.log('/create-user mapped ');
})

//handling get request for /start*end pattern
app.get('/start*end', function(req, res){
    res.send('you are on page with url patterned as start*end. '+
    '\n* may represent anything');
    console.log('/start*end pattern mapped');
})

//create a server to listen at port 8080
var server = app.listen(8080, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("server running on: http://%s:%s", host, port);
})
