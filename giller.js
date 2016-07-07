var port = 9006;
var express = require('express');
var app = express();

//Landing
app.get('/dashboard/assets/:resFN', function (req, res) {
  res.sendFile(__dirname + 'res/assets/' + req.params['resFN']);
});

//Resource
app.get('/dashboard', function (req, res) {
  res.sendFile(__dirname + 'res/index1.html');
});

//Dashboard
app.get('/dashboard', function (req, res) {
  res.sendFile(__dirname + 'res/index1.html');
});

//API
app.all('/api/v1',function(req,res){
  res.send('API')
});

app.listen(port, function () {
  console.log('Example app listening on port ' + . port . + ' !');
});
