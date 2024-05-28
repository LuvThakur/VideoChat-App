const User = require("../Models/userModel");
const filterObj = require("../Utils/FiltersObjFields");
const FriendRequest = require("../Models/friendRequest");

const catchAsync = require("../Utils/catchAsync");
const AudioCall = require("../Models/audicallModel");
const { Stream } = require("form-data");


const { generatedToken11 } = require("./zegoAssistantServer");



//catchAsync Automatically catches any errors that occur within the async function and passes them to the next middleware.


exports.getMe = catchAsync(async (req, res, next) => {

    console.log("profile-fetch", req.user);
    res.status(200).json({
        status: "success",
        data: req.user,
    })
});


exports.update = async (req, res, next) => {


    const userid = req.user._id;

    const filterbody = filterObj(req.body, "firstname ", "lastname", "about", "avatar");

    try {
        const options = {

            new: true,
            validateModifiedOnly: true
        }

        const updatedUser = await User.findByIdAndUpdate(userid, filterbody, options);


        if (!updatedUser) {
            res.status(404).json({
                status: "fail",
                message: "User not found"

            })
        }

        res.status(200).json({
            status: "success",
            user_data: updatedUser,
            message: "Successfully updated"
        });


        console.log("profile-updated", updatedUser);
    }
    catch (error) {
        console.log(error)

        res.status(500).json({
            status: "error",
            message: "Internal Server Error"
        })
    }

}


exports.getUsers = async (req, res, next) => {

    try {

        // const currentUser = req.user; // Assuming req.user contains the current user
        // const friendsIds = currentUser.friends.map(friend => friend.toString()); // Map friends to string IDs


        // const all_users_query = User.find({
        //     verified: true,
        //     _id: { $nin: [currentUser._id, ...friendsIds] } // Exclude the current user and their friends
        // }).select("firstname lastname _id");

        // Execute the query and await the result
        // const all_users = await all_users_query.exec();



        const all_users = User.find({
            verified: true,

        }).select("firstname lastname _id")


        // get an protected request

        const this_user = req.user;


        // remaing users whose are not friend and exlude me

        const remaining_users = (await all_users).filter(
            (user) => !this_user.friends.map(friend => friend.toString()).includes(user._id.toString()) && user._id.toString() !== this_user._id.toString()
        );



        console.log("all-users", remaining_users);



        res.status(200).json({

            status: "success",
            data: remaining_users,
            message: "Users found successfully"
        })
    }
    catch (error) {
        console.error('Error fetching getUsers:', error);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }

}


exports.getFriends = async (req, res, next) => {

    try {
        // get an protected request

        const this_user = req.user;

        const curr_user = await User.findById(this_user._id).populate("friends", "firstname lastname _id");

        console.log("curr user", curr_user);

        res.status(200).json({
            status: "success",
            data: curr_user.friends,
            message: "Friends found successfully!"
        })
    }
    catch (error) {

        console.error('Error fetching friends:', error);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }

}

exports.getRequests = async (req, res, next) => {
    try {
        // Get protected request
        const this_user = req.user;
        // console.log("reques-user", this_user);

        // Find friend requests where this user is the recipient
        const requests = await FriendRequest.find({ recipient: this_user._id }).populate("sender", "firstname lastname _id");


        console.log("reques-accept-log", requests);
        res.status(200).json({
            status: "success",
            data: requests,
            message: "Friend requests found successfully!"
        });
    } catch (error) {
        // If an error occurs, handle it
        console.error('Error fetching friend requests:', error);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
};






// Authorization and Authentication token generation


exports.generateZegoToken = catchAsync(async (req, res, next) => {

    try {
        const { userID, room_id } = req.body;

        console.log(userID, room_id, "from zego-Token");


        const effectiveTimeInSeconds = 3600; // token expiration time, unit: second
        const payloadObject = {

            // The token generated in this example allows publishStream (push stream) action
            room_id,  // The token generated allows loginRoom (login room) action

            privilege: {
                1: 1,
                2: 1,


            },
            stream_id_list: null,

        };


        const payload = json.stringify(payloadObject);

        // build token


        const token = generatedToken11(


            appID * 1,
            userID,
            serversecret,
            effectiveTimeInSeconds,
            payload
        )

        res.status(200).json({
            status: "success",
            message: "Token generated successfully",
            token
        })
    }

    catch (error) {
        console.log(error)
    }
});


// For Audio & Video


exports.getCallLogs = catchAsync(async (req, res, next) => {

    const user_id = req.user._id;

    const call_logs = [];

    const audio_calls = await AudioCall.find({
        participants: { $all: [user_id] }
    }).populate("from to");


    console.log("audio-call==>>", audio_calls);


    // Processing Audio Calls


    for (let elm of audio_calls) {

        const missed = elm.verdict !== 'Accepted';

        // check if current user is caller
        if (elm.from._id.toString() === user_id.toString()) {

            // Sets the other participant as the receiver.
            const other_user = elm.to;


            // Adds the call details to call_logs as an outgoing call.

            call_logs.push({
                id: elm._id,
                img: other_user.avatar,
                name: other_user.firstname,
                online: true,
                incoming: false,
                missed

            })


        }
        // check if current user is receiver 

        else {

            //  Sets the other participant as the caller.
            const other_user = elm.from;


            // Adds the call details to call_logs as an incoming call.
            call_logs.push({
                id: elm._id,
                img: other_user.avatar,
                name: other_user.firstname,
                online: true,
                incoming: false,
                missed
            })
        }

    }


    res.status(200).json({
        status: "success",
        message: "Call Logs Found successfully!",
        data: call_logs
    })


});


exports.startAudioCall = catchAsync(async (res, req, next) => {

    const from = req.user._id;
    const to = req.body._id;

    const from_user = await User.findById(from);
    const to_user = await User.findById(to);

    // create a new  audio_call Doc and send require data to client 

    const new_audio_Call = await AudioCall.create({

        participants: [from, to],
        from,
        to,
        status: "Ongoing"
    });



    res.status(200).json(
        {

            data: {
                from: to_user,
                roomID: new_audio_Call._id,
                StreamID: to,
                userID: from,
                userName: from_user.firstname

            },
        }
    )

});

