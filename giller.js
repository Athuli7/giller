var port = 9006;
var http = require('http');
const spawn = require('child_process').spawn;

function handleRequest(req, res){
  try{
    var dir = req.url;
    console.log(dir);
    //Git Pull
    const ls = spawn('git', ['pull', 'origin', 'master'], {cwd: dir});
    ls.stdout.on('data', (data) => {
      res.write(`stdout: ${data}`);
    });
    ls.stderr.on('data', (data) => {
      res.write(`stderr: ${data}`);
    });
    ls.on('close', (code) => {
      res.write(`child process exited with code ${code}\n`);
      //Restart
      var reqSplit = req.url.split('/');
      var sName = reqSplit[ reqSplit.length - 1 ];
      const rs = spawn('service', [ sNametoLowerCase() ,'restart']);
      rs.stdout.on('data', (data) => {
        res.write(`stdout: ${data}`);
      });
      rs.stderr.on('data', (data) => {
        res.write(`stderr: ${data}`);
      });
      rs.on('close', (code) => {
        res.end(`child process exited with code ${code}`);
      });
    });
  }catch(err){
    console.log(err);
  }
}

//Create a server
var server = http.createServer(handleRequest);

server.listen(port, function () {
  console.log('Example app listening on port ' + port + ' !');
});
