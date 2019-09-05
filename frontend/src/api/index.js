var socket = new WebSocket("ws://localhost:8080/ws");

var username = "UserError";

let connect = cb => {
  console.log("connecting");
  socket.onopen = () => {
    console.log("Successfully connected");
  };

  socket.onmessage = msg => {
    console.log(msg);
    let temp = JSON.parse(msg.data);
    console.log(temp.type);
    if (temp.type == 2) {
      username = temp.body;
    } else {
      cb(msg);
    }
  };
  socket.onclose = event => {
    console.log("Socket closed connection: ", event);
  };

  socket.onerror = error => {
    console.log("Socket error: ", error);
  };
};

let sendMsg = msg => {
  console.log("sending msg ", msg);
  socket.send(username + ": " + msg);
};

export { connect, sendMsg, username };
