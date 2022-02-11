const axios = require("axios");
const keepAlive = require("agentkeepalive");

const keepAliveAgent = new keepAlive({
  keepAlive: true,
  timeout: 3000, // active socket keepalive for 3 seconds
  freeSocketTimeout: 3000, // free socket keepalive for 3 seconds
});

async function getTemperature(ip) {
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

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{2})+(?!\d))/g, "$1.") + "°"; //C'
}

module.exports = { getTemperature };
