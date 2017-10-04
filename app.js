/**
 * Main application file
 */

'use strict';

var express=require('express');
var app =express();
var path = require('path');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var session = require('express-session');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//Helmet can help protect app from some well-known web vulnerabilities by setting HTTP headers appropriately.
app.use(helmet());
app.set('trust proxy', 1) // trust first proxy
//session
app.use(session({
  name: 'id',
  secret: 'sefwfsf',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,  //session last for seven days
    path: '/',
    httpOnly: true,
    secure: false
  },
  resave: false,
  saveUninitialized: false
}));
app.use(express.static(path.join(__dirname,'public')));

//database
var connection = mysql.createConnection({
  host: '47.94.228.175',
  user: 'root',
  password: '123123',
  database: 'myDataBase'
});
connection.connect(function(err) {
  if (err) throw err;
});

require('./routes')(app, connection);


//start the server
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
})
