import io from "socket.io-client";

// socket is a variable that will store the client instance.
let socket;

// connectSocket is a function that creates a new Socket.IO client instance and connects it to the server.
const connectSocket = (user_id) => {

    console.log("use-socket-id",user_id);
    
    socket = io("http://localhost:5000", {
        query: `user_id = ${user_id}`
    });

}


export { socket, connectSocket };