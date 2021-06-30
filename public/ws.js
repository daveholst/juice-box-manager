const myWebSocket = new WebSocket('ws://192.168.10.98:3000')


// window.addEventListener("load", function () { //when page loads

//   const relay1 = document.getElementById("relay-1");
//   relay1.addEventListener("change", function() { //add event listener for when checkbox changes
//     socket.emit("relay-1", Number(this.checked)); //send button status to server (as 1 or 0)
//   });
// });
// socket.on('relay-1', function (data) { //get button status from client
//   console.log('caught some data: ', data);
//   document.getElementById("relay-1").checked = data; //change checkbox according to push button on Raspberry Pi
//   // socket.emit("relay-1", data); //send push button status to back to server
// });

// window.addEventListener("load", () => {
//   myWebSocket.send
// })

myWebSocket.onopen = (event) => {
  myWebSocket.send("browser joined")
}
