const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cookieIoParser = require('socket.io-cookie-parser');
const path = require('path');
const public = path.join(__dirname, 'public');
const RandExp = require('randexp');
const cookieParser = require('cookie-parser');


app.use(express.static('public')); 
app.use(cookieParser());
app.use(express.urlencoded({
  extended: true
}))

let codes = [];
let cookies;

app.get('/', function(req, res){
    res.sendFile(path.join(public, '/html/index.html'));
});

app.get('/concert', function(req, res){
  if (/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z])/.test(req.cookies["valid_code"]))
  {
    res.sendFile(path.join(public, '/html/streaming.html'));
  }
  else{
    res.redirect("/"); 
  }

});

app.post('/auth', function(req, res) {
  let code = req.body.code
  if (/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z])/.test(req.cookies["valid_code"]))
  {
    res.redirect("/concert")
  }
  if (/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z])/.test(code) && !codes.includes(code)){
    codes.push(code)
    res.cookie('valid_code', code);
    res.redirect("/concert")
  }else {
    res.redirect("/") 
  }
});

io.use(cookieIoParser());

const users = {}

io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})
http.listen(3001, function(){
});