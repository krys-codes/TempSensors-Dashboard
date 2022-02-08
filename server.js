const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const server = require("http").createServer(app);
const webSocket = require("ws");
const axios = require("axios");
const ipList = require("./config/ipList");
const keepAlive = require("agentkeepalive");

app.set("views", path.join(__dirname, "/public/views"));
app.use(express.static(__dirname + "/public"));
app.use(expressLayouts);
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("layout");
});

const wss = new webSocket.Server({ server: server });

const keepAliveAgent = new keepAlive({
  keepAlive: true,
  timeout: 3000, // active socket keepalive for 3 seconds
  freeSocketTimeout: 3000, // free socket keepalive for 3 seconds
});

async function getData(ip) {
  try {
    const response = await axios(`${ip}/state`, {
      crossdomain: true,
      transformResponse: undefined,
      httpAgent: keepAliveAgent,
    });
    return formatNumber(
      JSON.stringify(response.data.tempSensor.sensors[0].value)
    );
  } catch (err) {
    return "Error";
  }
}
wss.on("connection", function connection(ws) {
  console.log("A new client Connected!");
  ws.send("Welcome New Client!");

  ipList.forEach((el) => {
    (async () => {
      const response = await getData(el.ip);
      console.log(response);
      //ws.send(el.name + " : " + response);
      ws.send(
        JSON.stringify({
          ip: el.ip,
          name: el.name,
          temperature: response,
        })
      );
    })();
  });
});

server.listen(8080, () => console.log(`server started`));

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{2})+(?!\d))/g, "$1.") + "°"; //C'
}
