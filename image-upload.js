/**
* uploads and saves image (not other file type ) to /public/uploads/ directory
* @author Subash Bhattarai
*/

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();

//set ejs template engine
app.set('view engine', 'ejs');

//set static content
app.use(express.static('public'));

//handle get request
app.get(['/', '/upload'], (req, res)=>{
    res.render('upload');
});

//setup storage engine for file upload
const storageConfig = multer.diskStorage({
    destination: __dirname + '/public/uploads/',
    filename: function(req, file, callback){
        callback(null, file.fieldname + '-' +
        Date.now() + path.extname(file.originalname));
    }
});

//setup upload
const upload = multer({
    storage: storageConfig,
    limits: {fileSize: 1000000},
    fileFilter: (req, file, callback)=>{
        const supportedTypes = /jpeg|jpg|png|gif/;
        const extname = supportedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = supportedTypes.test(file.mimetype);
        if(mimetype && extname){
            return callback(null, true);
        }else{
            callback('This file format is not supported !');
        }
    }
}).single('image'); //this 'image' must match with input field name

//handle post request
app.post('/upload', (req, res)=>{
    upload(req, res, (err)=>{
        if(err){
            res.render('upload', {message: err});
        }else{
            //console.log(req.file);
            if(req.file == undefined){
                res.render('upload', {message: 'Error: No file selected !'});
            }else{
                res.render('upload', {
                     message : 'File uploaded !',
                     file : '/uploads/' + req.file.filename
                 });
            }
        }
    })
});

//server
const port = 8080;
app.listen(port, ()=>{
    console.log('server started on port %s', port);
});
