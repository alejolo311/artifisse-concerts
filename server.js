const express = require('express');
var cors = require('cors')
const RandExp = require('randexp');
const app = express();
var multiparty = require('multiparty');
const path = require('path');
const public = path.join(__dirname, 'public');

let codes = []
app.use(cors())
app.use(express.urlencoded({
  extended: true
}))
app.get('/', function(req, res) {
    res.sendFile(path.join(public, '/html/index.html'));
});

app.post('/auth', function(req, res) {
  let code = req.body.code
  console.log(new RandExp(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z])/).gen());
  if (/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z])/.test(code)){
    console.log(codes)
    res.redirect("/concert")
  }else {
    console.log(codes)
    res.redirect("/")
    console.log(codes)
  }
});

app.get('/concert', function(req, res) {
  res.sendFile(path.join(public, '/html/streaming.html'));
});

app.use('/', express.static(public));

app.listen(8080);