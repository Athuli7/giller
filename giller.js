var port = 9006;
//var flatfile = require('flat-file-db');
//var db = flatfile(__dirname + '/db/assoc.db');
var express = require('express');
var app = express();
//var bodyParser = require('body-parser');
//app.use(bodyParser.json()); // support json encoded bodies
//app.use(bodyParser.urlencoded({ extended: true }));
const spawn = require('child_process').spawn;
//var util = require("util");
/*
//Landing
app.get('/', function (req, res) {
  res.rewrite('/dashboard');
  //res.send('<html><a href="dashboard/">Dashboard</a></html>');
});

//Resource
app.get('/dashboard/:resFN', function (req, res) {
  res.sendFile(__dirname + '/res/' + req.params['resFN']);
});

//Dashboard
app.get('/dashboard', function (req, res) {
  res.sendFile(__dirname + '/res/index.html');
});

//API
app.all('/api/v1',function(req,res){
  res.send('API')
});

app.all('/api/v1/repo/list',function(req,res){
  res.send(db.keys());
});
app.all('/api/v1/:repoID/create',function(req,res){
  db.put(req.params['repoID'], req.body.location);
});

app.all('/api/v1/:repoID/pull',function(req,res){
  //db search
  var tmpdir = db.get(res.params['repoID']);
  //git pull
*/
app.all('/*',function(req,res){
  var dir = req.path;
  console.log(dir);
  const ls = spawn('git', ['pull', 'origin', 'master'], {cwd: dir});
  ls.stdout.on('data', (data) => {
    res.write(`stdout: ${data}`);
  });
  ls.stderr.on('data', (data) => {
    res.write(`stderr: ${data}`);
  });
  ls.on('close', (code) => {
    res.end(`child process exited with code ${code}`);
  });
});

app.listen(port, function () {
  console.log('Example app listening on port ' + port + ' !');
});
