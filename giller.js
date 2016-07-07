var port = 9006;
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.all('/api/v1',function(req,res){
  res.send('API')
});
app.listen(port, function () {
  console.log('Example app listening on port ' + . port . + ' !');
});
