
const myWebSocket = new WebSocket('ws://192.168.10.98:3000')


window.addEventListener("load", function () { //when page loads

  const relay1 = document.getElementById("relay-1");
  relay1.addEventListener("change", function () { //add event listener for when checkbox changes
    myWebSocket.send(JSON.stringify({
      device: "relay-1",
      engaged: this.checked ? true : false
    })); //send button status to server (as 1 or 0)
  });
});
myWebSocket.onmessage = function (event) {
  message = JSON.parse(event.data)
  console.log(message);

  document.getElementById("relay-1").checked = message.engaged; //change checkbox according to push button on Raspberry Pi
  // socket.emit("relay-1", data); //send push button status to back to server
};





myWebSocket.onopen = (event) => {
  // ask for current status?
  myWebSocket.send(JSON.stringify({
    message: "browser joined"
  }) )
}

// const testButton = document.querySelector('#test-button');

// testButton.addEventListener('click', (e) => {
//   const message = {
//     action: "turn_on",
//     device: "relay_1"
//   }
//   console.log(message);
//   myWebSocket.send(JSON.stringify(message));
// })