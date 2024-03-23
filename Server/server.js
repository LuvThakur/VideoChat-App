const { Server } = require('socket.io');

const app = require('./app');

const mongoose = require('mongoose');
const User = require('./Models/userModel');

// Load environment variables from .env file
require('dotenv').config();


// uncaught exception error handling
process.on("uncaughtException", (err) => {
    console.log(err);
    process.exit(1);

})


// setup db connection
// const db_url = process.env.DB_URI.replace("<password>", process.env.DB_PASS);
const mongoURI = "mongodb://127.0.0.1:27017/ChatApp";

const options = {

    // no longer needed
};


mongoose.connect(mongoURI, options).then(
    () => {
        console.log('Connected to MongoDB');
        startServer();
    }
).catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);

})

function startServer() {


    // we need http server 
    const http = require('http');

    // server create 
    const server = http.createServer(app);


    // socket.io

    const io = new Server(
        server,
        {
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST"]
            }
        }
    );



    // port 
    const port = process.env.PORT || 8000;

    server.listen(port, () => {
        console.log(`Server Running at port ${port}`);
    })

    // listen io server for real-time connection


    io.on("connection", async (socket) => {


        console.log("soc->", socket);
        const user_id = socket.handshake.query("user_id");

        const socket_id = socket.id;


        console.log(`User connected on ${socket_id}`)

        if (user_id) {
            await User.findByIdAndUpdate(user_id, { socket_id });
        }


        // event listners- >>

        //user A send an  request to any user

        socket.on("friend__request", async (data) => {

            console.log(data.to); //{to : id (1234)}

            const to = await User.findById(data.to);


            io.to(to.socket_id).emit("new_friend_request", {
// 
            })
        })

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });





    // handle Rejection error
    process.on("unhandledRejection", (err) => {
        console.log(err);
        server.close(() => {
            process.exit(1);
        });
    })
}