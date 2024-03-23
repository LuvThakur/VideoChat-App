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

    const all_users = User.find({
        verified: true,

    }).select("firstname lastname _id")


    // get an protected request

    const this_user = req.user;


    // remaing users whose are not friend and exlude me

    const remaining_users = (await all_users).filter(
        (user) => !this_user.friends.include(user._id) && user._id.toString() !== this_user._id.toString()
    );


    res.status(200).json({

        status: "success",
        data: remaining_users,
        message: "Users found successfully"
    })

}