const { Server } = require('socket.io');

const app = require('./app');

const mongoose = require('mongoose');
const User = require('./Models/userModel');
const FriendRequest = require('./Models/friendRequest');

const path = require('path');

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
    // When a client connects to the server, socket.io performs a handshake to establish the WebSocket connection.

    io.on("connection", async (socket) => {


        console.log("soc->", socket);
        const user_id = socket.handshake.query("user_id");

        const socket_id = socket.id;


        console.log(`User connected on ${socket_id}`)

        if (Boolean(user_id)) {
            await User.findByIdAndUpdate(user_id, { socket_id, status: "Online" });
        }


        // event listners- >>

        //user A send an  request to any user
        // to->id of  whom reuest sending
        // from -> sender id
        socket.on("friend__request", async (data) => {

            console.log(data.to); //{to : id (1234)}

            const to_User = await User.findById(data.to).select("socket_id");
            const from_User = await User.findById(data.from).select("socket_id");

            // create frind request

            await FriendRequest.create({
                sender: data.from,
                recipient: data.to,
            })


            io.to(to_User.socket_id).emit("new_friend_request", {
                // 

                message: "New frnd Request  Received"
            });

            io.to(from_User.socket_id).emit("request_sent", {
                // 

                message: "New frnd Request  sent succes"
            });



        });

        socket.on("accept_request", async (data) => {
            console.log(data);

            const request_doc = await FriendRequest.findById(data.request_id);
            console.log(request_doc)

            // request_id

            const sender = await User.findById(request_doc.sender);
            const receiver = await User.findById(request_doc.receiver);

            sender.friends.push(request_doc.recipient);
            receiver.friends.push(request_doc.sender);

            await receiver.save({ new: true, validateModifiedOnly: true });

            await FriendRequest.findByIdAndDelete(data.request_id);

            io.to(sender.socket_id).emit("request accept", {
                message: "Frnd Req accept"
            });

            io.to(receiver.socket_id).emit("request accept", {
                message: "Frnd Req accept"
            });






        });


        // handle link/text msg

        socket.on("text_message", (data) => {
            console.log("received msg", data)


            // data :{to , from , text}
            // create new conversat , add new msg, 
            // save to db
            // emit incomi msg - to user
            // emit outgo msg from user
        });



        socket.on("file_message", (data) => {

            console.log("received msg", data)


            // data :{to , from , text ,file}

            // get file extension

            const fileExtension = path.extname(data.file.name);

            // genert unique fil name

            const genFilename = `${Date.now()}_${Math.floor(Math.random() * 1000)}_${fileExtension}`;


            // upload to aws s3 

            // create new conversat , add new , 
            // save to db
            // emit incomi msg -> to user
            // emit outgo msg <- from user

        });



        // socket.on('disconnect', () => {
        //     console.log('user disconnected');

        // });

        socket.on('end', async (data) => {
            console.log('user disconnected');

            // find user_id and set status offline
            if (data.user_id) {

                await User.findByIdAndUpdate(data.user_id, { status: "Offline" })
            }

            // todo for  brodacast connection
            socket.disconnect(0);
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