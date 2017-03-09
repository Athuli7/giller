var port = 9006;
var http = require('http');
const spawn = require('child_process').spawn;

function eSIF(res, dir, executable, vars){
  //Git Pull
    const ls = spawn('git', , {cwd: dir});
    ls.stdout.on('data', (data) => {
      res.write(`stdout: ${data}`);
    });
    ls.stderr.on('data', (data) => {
      res.write(`stderr: ${data}`);
    });
    ls.on('close', (code) => {
      res.write(`child process exited with code ${code}\n`);
    });
}

function handleRequest(req, res){
  try{
    var dir = req.url;
    var reqSplit = req.url.split('/');
    var sName = reqSplit[ reqSplit.length - 1 ];
    res.write(dir+'\n');
    eSIF(res, dir, 'git', ['pull', 'origin', 'master']);
    eSIF(res, dir, 'service', [ sName.toLowerCase(), 'restart']);
    res.end('Done')
  }catch(err){
    console.log(err);
  }
}

//Create a server
var server = http.createServer(handleRequest);

server.listen(port, function () {
  console.log('Example app listening on port ' + port + ' !');
});