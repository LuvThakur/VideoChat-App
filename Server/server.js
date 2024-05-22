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


        // console.log("soc->", JSON.stringify(socket.handshake.query));

        let user_id = socket.handshake.query['user_id ']; // Note the extra space

        // Clean up user_id: Remove leading and trailing whitespace
        user_id = user_id.trim();


        if (!user_id) {
            console.log("User ID not found in query.");
            // Handle this case accordingly
            return;
        }


        const socket_id = socket.id;

        // console.log(`User connected on socket_id ${socket_id}`)


        if (Boolean(user_id)) {
            await User.findByIdAndUpdate(user_id, { socket_id: socket_id, status: "Online" });
        }


        // event listners- >>

        //user A send an  request to any user
        // to->id of  whom reuest sending
        // from -> sender id
        socket.on("friend_request", async (data) => {

            try {

                const to_User = await User.findById(data.to).select("socket_id");
                const from_User = await User.findById(data.from).select("socket_id");

                // check user already friends or not

                const alreadyFriends = await areFriends(data.from, data.to);

                console.log("ale->1");
                console.log("ale->", alreadyFriends);

                if (alreadyFriends) {
                    console.log("alresy")
                    io.to(from_User.socket_id).emit("request_sent_error", {

                        message: "Error: You are already friends with this user."

                    });

                }

                else {
                    // If they are not already friends, create a new friend request

                    await FriendRequest.create({
                        sender: data.from,
                        recipient: data.to,
                    })

                    console.log("Received friend request:", data);


                    console.log("\nEmitted  to_User.socket_i->", to_User.socket_id);
                    console.log("\nEmitted  from_User.socket_i->", from_User.socket_id);



                    // Emit new_friend_request
                    io.to(to_User.socket_id).emit("new_friend_request", {
                        message: "New friend request received!"
                    });


                    io.to(from_User.socket_id).emit("request_sent", {
                        message: "New friend request sent successfully!"
                    });
                }

            }

            catch (error) {
                console.error("Error handling friend_request:", error);
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

            console.log("User_doc Receiver", request_doc);
            try {

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

                console.log("send->", sender);
                console.log("rece->", receiver);



                const AnalreadyFriends = await areFriends(sender._id, receiver._id);



                if (AnalreadyFriends) {
                    console.log("Already friends, canceling request");

                    // Here you can emit an event to inform the client that the request cannot be accepted
                    io.to(sender.socket_id).emit("request_accepted_error", {
                        message: "Error: You are already friends with this user."
                    });
                    return;

                }

                // Add to friends list
                sender.friends.push(request_doc.recipient);
                receiver.friends.push(request_doc.sender);



                await sender.save({ new: true, validateModifiedOnly: true });
                await receiver.save({ new: true, validateModifiedOnly: true });

                await FriendRequest.findByIdAndDelete(data.request_id);

                console.log("Friendship established!");

                io.to(sender.socket_id).emit("request_accepted", {
                    message: `Frnd Req accept by ${receiver.firstname}`
                });

                io.to(receiver.socket_id).emit("request_accepted", {
                    message: `Now You and ${sender.firstname} became friends`
                });

            } catch (error) {
                console.error("Error saving friendship:", error);
                // Handle the error, maybe send a response to the client
            }

        });


        // Function to check if two users are already friends
        async function areFriends(senderId, recipientId) {

            try {

                console.log("senderId", senderId, "reci[pient", recipientId);


                const existingFriendship = await FriendRequest.findOne({

                    $or: [
                        {
                            user1: senderId, user2: recipientId
                        },
                        {
                            user1: recipientId, user2: senderId
                        }
                    ]

                })

                console.log("exist friend", existingFriendship);

                return !!existingFriendship;
            }
            catch (error) {
                console.error("Error checking friendship:", error);

                return null;

            }

        }



        // handle event  for getmessage

        socket.on("get_messages", async (data, callback) => {

            const { messages } = await one2oneMessage.findById(data.conversation_id).select("messages");

            console.log("get_msg_Event", messages);

            callback(messages);
        })


        // handle link/text msg

        socket.on("text_message", async (data) => {


            try {
                console.log("received msg", data)

                // data :{to , from , text , conversation_id , type}



                const { to, from, message, conversation_id, type } = data;

                const to_User = await User.findById(to);
                const from_User = await User.findById(from);


                // create new conversat , add new msg, 

                const new_message = {
                    _id: new mongoose.Types.ObjectId(),
                    to,
                    from,
                    type,
                    text: message,
                    created_at: Date.now(),
                }


                const chat = await one2oneMessage.findById(conversation_id);

                chat.messages.push(new_message);

                // save to db

                await chat.save({});



                if (!to_User || !from_User) {
                    console.error("One of the users is not found.");
                    // Handle this case appropriately, perhaps by sending an error response.
                    return;
                }


                // emit incomi msg - to user

                io.to(to_User.socket_id).emit("new_message", {

                    conversation_id,
                    message: new_message
                })


                // emit outgo msg from user

                io.to(from_User.socket_id).emit("new_message", {
                    conversation_id,
                    message: new_message
                })
            }
            catch (error) {
                console.error("Error handling text_message event:", error);
            }

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

        socket.on("get_direct_conversations", async ({ user_id }, callback) => {

            const existing_conversation = await one2oneMessage.find({
                participants: { $all: [user_id] },
            }).populate("participants", "firstname lastname email _id status")


            console.log("exit_conversation", existing_conversation);

            callback(existing_conversation);

        })




        //  start_conversation

        socket.on("start_conversation", async (data) => {

            const { to, from } = data;

            // check there is  any conversation exist or not b/w 2 users


            const existing_conversation = await one2oneMessage.find({
                participants: { $size: 2, $all: [to, from] },

            }).populate("participants", "firstname lastname email _id status");


            console.log("existing conversations", existing_conversation[0]);


            // if no conversation exist 

            if (existing_conversation.length === 0) {
                let new_chat = await one2oneMessage.create({
                    participants: [to, from],
                });

                new_chat = await one2oneMessage.findById(new_chat._id).populate("participants", "firstname lastname email _id status");


                console.log("new_chat", new_chat);

                socket.emit("start_chat", new_chat);
            }

            // there is conversation exist
            else {

                socket.emit("start_chat", existing_conversation[0]);
            }

        })











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