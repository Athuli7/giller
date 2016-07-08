var port = 9006;
var http = require('http');
const spawn = require('child_process').spawn;

function handleRequest(req, res){
  var dir = req.url;
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
  const rs = spawn('service', [ req.path.split('/')[-1] ,'restart']);
  rs.stdout.on('data', (data) => {
    res.write(`stdout: ${data}`);
  });
  rs.stderr.on('data', (data) => {
    res.write(`stderr: ${data}`);
  });
  rs.on('close', (code) => {
    res.end(`child process exited with code ${code}`);
  });
}

//Create a server
var server = http.createServer(handleRequest);

server.listen(port, function () {
  console.log('Example app listening on port ' + port + ' !');
});
