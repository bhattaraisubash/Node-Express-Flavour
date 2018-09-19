/**
* renders html file with data
* @author Subash Bhattarai
*/

var express = require('express')
var app = express();

// set view engine to ejs
app.set('view engine', 'ejs');

var bodyParser = require('body-parser');
//x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(express.static('public'));

app.get('/', function(req, res){
    res.sendFile(__dirname+"/index.html");
})

app.post('/login', urlencodedParser, function(req, res){
    response = {
        username: req.body.username,
        password: req.body.password
    };
    console.log(response);

    /*
    * ejs by default looks for ejs files under views directory
    * i.e.views/welcome.ejs in our case
    */
    res.render('welcome', {username: response['username']});
})

var server = app.listen(8080, function(){
    console.log("server running on port: %s", server.address().port);
})
