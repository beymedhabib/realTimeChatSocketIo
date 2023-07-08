var express = require("express");
var jsonparser = require("body-parser");
const socketIO = require('socket.io');
// var db = require("./db/database");
var userapi = require("./controllers/user");
var chat = require("./controllers/chat");
// var upload = require("./Api/upload");
// var article = require("./Api/articleApi");
// var affect = require('./Api/affectApi')
// var passport = require("./api/passport")

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/chat")
var db = mongoose.connection;
db.on("error", () => {
    console.log("> error occurred from the database");
});
db.once("open", () => {
    console.log("> successfully opened the database");
});

const cors = require("cors");
var app = express();
app.use(cors());
var http = require('http');
app.use(jsonparser.json({ limit: '50mb' }));
app.use(jsonparser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

app.use("/user",userapi);



const server = http.createServer(app);  
const io = socketIO(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });
app.set('io', io);
app.use("/chat",chat);

server.listen(4000);
