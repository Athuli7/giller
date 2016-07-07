var port = 9006;
var express = require('express');
var app = express();
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

app.all('/api/v1/update',function(req,res){
  const ls = spawn('ls', ['-lh', '/usr'], [cwd: __dirname]);
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
