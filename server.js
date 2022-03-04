const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const server = require("http").createServer(app);
const webSocket = require("ws");
const wss = new webSocket.Server({ server: server });
const ipList = require("./config/ipList");
const initializeApp = require("./firebase/firebaseConfig");
const { getTemperature } = require("./getTemperature.js");
const { addFirebaseUsage } = require("./firebase/firebaseUsage.js");

app.set("views", path.join(__dirname, "/public/views"));
app.use(express.static(__dirname + "/public"));
app.use(expressLayouts);
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("layout");
});

wss.on("connection", function connection(ws) {
  ipList.forEach((el) => {
    (async () => {
      const response = await getTemperature(el.ip);
      const temperatureCard = JSON.stringify({
        ip: el.ip,
        name: el.name,
        temperature: response,
      });
      ws.send(temperatureCard);
    })();
  });

  addFirebaseUsage();
});

server.listen(8080, () => console.log(`server started`));