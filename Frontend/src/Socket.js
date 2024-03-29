import io from "socket.io-client";

// socket is a variable that will store the client instance.
let socket;

// connectSocket is a function that creates a new Socket.IO client instance and connects it to the server.
const connectSocket = (user_id) => {
    socket = io("http://localhost/3001", {
        query: `user_id = ${user_id}`
    });

}


export { socket, connectSocket };