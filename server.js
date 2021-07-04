const express = require("express"); //express framework to have a higher level of methods
require('dotenv').config()
const app = express(); //assign app variable the express class/method
var http = require("http");
const server = http.createServer(app); //create a server
var path = require("path");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public/')));

// setup MQTT connection
const mqtt = require('mqtt')
const mqttClient = mqtt.connect(process.env.MQTTSERVER, {
  username: process.env.MQTTUSR,
  password: process.env.MQTTPWD
})

mqttClient.on('connect', function () {
  mqttClient.subscribe('juicebox1/#', function (err) {
    if (!err) {
      mqttClient.publish('juicebox1', 'Server Online!')
    }
  })
})


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.post('/api/relays', (req, res) => {
  console.log(req.body);
  const { topic, payload } = req.body;
  mqttClient.publish(`juicebox1/${topic}`, payload)
})







server.listen(3000);
