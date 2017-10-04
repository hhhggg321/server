'use strict';

module.exports = function(app, connection){

  app.get('/heroes',function(req, res){
    if(req.query.name){
      connection.query("select * from heroes where name like '%" + req.query.name + "%'", function(error,results, fields) {
        if(error) throw error;
        res.status(200);
        console.log(results);
        res.json(results);
      })
    }else {
      connection.query('select * from heroes', function(error, results, fields) {
        if(error) throw error;
        res.status(200);
        res.json(results);
      });
    }
    
  });

  app.get('/heroes/:id',function(req, res){
    connection.query('select * from heroes where id =' + req.params.id, function(error, results, fields) {
      if(error) throw error;
      console.log('delete');
      res.status(200);
      res.json(results[0]);
    });
  });

  app.delete('/heroes/:id', function(req, res){
    connection.query('delete from heroes where id =' + req.params.id, function(error, results, fields) {
      if(error) throw error;
      res.status(200);
      res.json({status: 'ok'})
    })
  });

  app.post('/heroes', function(req, res){
    connection.query('insert into heroes set ?', req.body, function(error, results, fields) {
      if(error) throw error;
      res.status(200);
      let response = req.body;
      response.id = results.insertId;
      res.json(response);
    })
  });

  app.put('/heroes/:id', function(req, res){
    connection.query('update heroes set name = ? where id = ?', [req.body.name, req.params.id], function(error, results, fields) {
      if(error) throw error;
      console.log(results);
      res.status(200);
      res.json(req.body);
    })
  });

}



