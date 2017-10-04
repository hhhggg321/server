'use strict';

module.exports = function(app, connection) {
  
  var heroesRouter = require('./heroes');

  //设置跨域访问
  app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  });
  
  //heroes routing
  require('./heroes')(app, connection);


  app.route('/*')
    .get(function(req, res) {
      res.send('hello world')
  });
}