var port = 9006;
var http = require('http');
const spawn = require('child_process').spawn;

function eSIF(dir, executable, vars, callback){
  //Git Pull
    var output = "";
    console.log([executable, vars, {cwd : dir}]);
    const ls = spawn(executable, vars, {cwd: dir});
    ls.stdout.on('data', (data) => {
      output = output + '\nstdout: ' + data;
    });
    ls.stderr.on('data', (data) => {
      output = output + '\nstderr: ' + data;
    });
    ls.on('close', (code) => {
      output = output + '\nchild process exited with code ' + code ;
      callback(output);
    });
}

function handleRequest(req, res){
  try{
    var dir = req.url;
    var reqSplit = req.url.split('/');
    var sName = reqSplit[ reqSplit.length - 1 ];
    eSIF(dir, 'git', ['pull', 'origin', 'master'], function(output){
      res.write(output);
      eSIF(dir, 'service', [ sName.toString().toLowerCase(), 'restart'], function(output){
        res.end(output);
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