var port = 9006;
var http = require('http');
const spawn = require('child_process').spawn;

function eSIF(dir, executable, vars){
  //Git Pull
    var output = "";
    const ls = spawn(executable, vars, {cwd: dir});
    ls.stdout.on('data', (data) => {
      output = output + '\nstdout: ' + data;
    });
    ls.stderr.on('data', (data) => {
      output = output + '\nstderr: ' + data;
    });
    ls.on('close', (code) => {
      output = output + '\nchild process exited with code ' + code ;
    });
    return output;
}

function handleRequest(req, res){
  try{
    var dir = req.url;
    var reqSplit = req.url.split('/');
    var sName = reqSplit[ reqSplit.length - 1 ];
    res.write(eSIF(dir, 'git', ['pull', 'origin', 'master']));
    res.end(eSIF(dir, 'service', [ sName.toLowerCase(), 'restart']));
    //res.end('Done')
  }catch(err){
    console.log(err);
  }
}

//Create a server
var server = http.createServer(handleRequest);

server.listen(port, function () {
  console.log('Example app listening on port ' + port + ' !');
});