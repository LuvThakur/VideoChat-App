const { Server } = require('socket.io');

const app = require('./app');

const mongoose = require('mongoose');
const User = require('./Models/userModel');
const one2oneMessage = require("./Models/OnetoOneModel");
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
    const port = process.env.PORT || 5000;

    server.listen(port, () => {
        console.log(`Server Running at port ${port}`);
    })


    // listen io server for real-time connection
    // When a client connects to the server, socket.io performs a handshake to establish the WebSocket connection.


    io.on("connection", async (socket) => {


        // console.log("hand->",socket.handshake);
        // console.log("soc->", socket);


        console.log("soc->", JSON.stringify(socket.handshake.query));

        let user_id = socket.handshake.query['user_id ']; // Note the extra space

        // Clean up user_id: Remove leading and trailing whitespace
        user_id = user_id.trim();


        if (!user_id) {
            console.log("User ID not found in query.");
            // Handle this case accordingly
            return;
        }
        const socket_id = socket.id;

        console.log(`User connected on socket_id ${socket_id}`)

        console.log("boolean->", Boolean(user_id))

        if (Boolean(user_id)) {
            await User.findByIdAndUpdate(user_id, { socket_id: socket_id, status: "Online" });
        }

        console.log("boolean->", Boolean(user_id))

        // event listners- >>

        //user A send an  request to any user
        // to->id of  whom reuest sending
        // from -> sender id
        socket.on("friend_request", async (data, ack) => {

            try {

                const to_User = await User.findById(data.to).select("socket_id");
                const from_User = await User.findById(data.from).select("socket_id");

                // create frind request

                await FriendRequest.create({
                    sender: data.from,
                    recipient: data.to,
                })

                console.log("Received friend request:", data);

                // Emit new_friend_request
                io.to(to_User.socket_id).emit("new_friend_request", {
                    message: "New friend request received!"
                });

                console.log("\nEmitted  to_User.socket_i->", to_User.socket_id);
                console.log("\nEmitted  from_User.socket_i->", from_User.socket_id);


                io.to(from_User.socket_id).emit("request_sent", {


                    message: "New frnd Request  sent succes"
                });

                ack({ success: true });

            } catch (error) {
                console.error("Error handling friend_request:", error);
                // Acknowledge with failure
                ack({ success: false });
            }


        });


        // accept frnd request 

        socket.on("accept_request", async (data) => {

            console.log("accept->", data);
            const request_doc = await FriendRequest.findById(data.request_id);

            if (!request_doc) {
                console.log("Friend request not found");
                return;
            }
            // Check if sender and receiver exist

            console.log("User_doc", request_doc);

            const sender = await User.findById(request_doc.sender);
            const receiver = await User.findById(request_doc.recipient);

            if (!sender) {
                console.log("Sender  not found");
                return;
            }
            if (!receiver) {
                console.log(" receiver not found");
                return;
            }

            // Add to friends list
            sender.friends.push(request_doc.recipient);
            receiver.friends.push(request_doc.sender);

            try {
                await receiver.save({ new: true, validateModifiedOnly: true });

                await FriendRequest.findByIdAndDelete(data.request_id);

                console.log("Friendship established!");

                io.to(sender.socket_id).emit("request accept", {
                    message: "Frnd Req accept"
                });

                io.to(receiver.socket_id).emit("request accept", {
                    message: "Frnd Req accept"
                });

            } catch (error) {
                console.error("Error saving friendship:", error);
                // Handle the error, maybe send a response to the client
            }



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



        // one2one direct conversation
        /*
                socket.on("get_direct_conversations", async ({ user_id }, callback) => {
        
                    const existing_conversation = await one2oneMessage.find({
                        participants: { $all: [user_id] },
                    }).populate("participants", "firstname lastname email _id status")
        
        
                    console.log("exit_conversation", existing_conversation);
        
                    callback(existing_conversation);
        
                })
        
                // socket.on('disconnect', () => {
                //     console.log('user disconnected');
        
                // });
        */

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