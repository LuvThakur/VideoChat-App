const User = require("../Models/userModel");
const filterObj = require("../Utils/FiltersObjFields");

exports.update = async (req, res, next) => {


    const { user } = req.body;

    const filterbody = filterObj(req.body, "firstname ", "lastname", "about", "avatar");

    try {
        const options = {

            new: true,
            validateModifiedOnly: true
        }

        const updatedUser = await User.findByIdAndUpdate(user._id, filterbody, options);


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

        const all_users_query = User.find({
            verified: true,
            _id: { $ne: req.user._id } // Exclude the current user
        }).select("firstname lastname _id");

        // Execute the query and await the result
        const all_users = await all_users_query.exec();

        console.log("all-users", all_users);



        res.status(200).json({

            status: "success",
            data: all_users,
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
        console.log("reques-user",this_user);

        // Find friend requests where this user is the recipient
        const requests = await FriendRequest.find({ recipient: this_user._id }).populate("sender", "firstname lastname _id");
        
        
        console.log("reques-accept",requests);
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