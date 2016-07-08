var port = 9006;
var flatfile = require('flat-file-db');
var db = flatfile(__dirname + '/db/assoc.db');
var express = require('express');
var app = express();
app.use(express.bodyParser());
const spawn = require('child_process').spawn;

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
app.all('/api/v1/:repoID/create',function(req,res){
  db.put(req.params['repoID'], req.param('location', '/tmp/'));
});
app.all('/api/v1/:repoID/pull',function(req,res){
  //db search
  var tmpdir = db.get(res.params['repoID']);
  //git pull
  const ls = spawn('git', ['pull', 'origin', 'master'], {cwd: tmpdir});
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
