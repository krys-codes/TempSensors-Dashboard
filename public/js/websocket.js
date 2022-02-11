// Create WebSocket connection.
const socket = new WebSocket("ws://localhost:8080");
// Connection opened
socket.addEventListener("open", function (event) {
  console.log("Connected to WS Server");
});
// Listen for messages
socket.addEventListener("message", function (event) {
  //message from server
  //console.log("Message from server ", event.data);
  const mainDiv = document.querySelector(".wrap");
  const tempCard = document.createElement("div");
  tempCard.setAttribute("class", "temp-card");

  const temperature = document.createElement("h1");
  temperature.setAttribute("class", "temperature");
  temperature.textContent = JSON.parse(event.data).temperature;

  const tempIcon = document.createElement("div");
  if (temperature.textContent == "Error") {
    tempIcon.setAttribute("class", "temp-icon burn");
  } else {
    tempIcon.setAttribute("class", "temp-icon light");
  }

  const ahref = document.createElement("a");
  ahref.setAttribute("href", JSON.parse(event.data).ip);
  ahref.setAttribute("target", "_blank");
  ahref.textContent = JSON.parse(event.data).name;

  mainDiv.appendChild(tempCard);
  tempCard.appendChild(tempIcon);
  tempCard.appendChild(ahref);
  tempCard.appendChild(temperature);
});
