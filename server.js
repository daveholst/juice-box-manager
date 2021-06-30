const express = require("express"); //express framework to have a higher level of methods
const app = express(); //assign app variable the express class/method
var http = require("http");
const server = http.createServer(app); //create a server
var path = require("path");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public/')));
//***************this snippet gets the local ip of the node.js server. copy this ip to the client side code and add ':3000' *****
//****************exmpl. 192.168.56.1---> var sock =new WebSocket("ws://192.168.56.1:3000");*************************************

require("dns").lookup(require("os").hostname(), function (err, add, fam) {
  console.log("addr: " + add);
});


const WebSocket = require("ws");
const socketServer = new WebSocket.Server({ server });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

socketServer.on("connection", function (ws, req) {
  /******* when server receives messsage from client trigger function with argument message *****/
  ws.on("message", function (message) {
    console.log("Received: " + message);
    socketServer.clients.forEach(function (client) {
      //broadcast incoming message to all clients (s.clients)
      if (client != ws && client.readyState) {
        //except to the same client (ws) that sent this message
        client.send(message);
      }
    });
  });
  ws.on("close", function () {
    console.log("lost one client");
  });
  //ws.send("new client connected");
  console.log("new client connected");
});
server.listen(3000);
