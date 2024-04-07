import React, { useState } from 'react';
import { Dialog, Typography, Stack, Tabs, Tab, DialogContent } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { FetchFriendRequests, FetchFriends, FetchUsers } from '../../Redux/Slice/SidebarSlice';
import { useEffect } from 'react';
import { FriendRequestComponent, UserComponent, UserFriendsComponent } from '../../components/User_Friends';


const UserLists = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(FetchUsers());
    }, []);

    const { users } = useSelector((state) => state.appe);

    console.log("users->", users);

    return (
        <>
            {

                users.map((el, idx) => {
                    // RenderCompnent
                    return <UserComponent key={el._id} {...el} />
                })
            }

        </>
    )
}

const FriendsLists = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(FetchFriends());
    }, []);

    const { friends } = useSelector((state) => state.appe);


    console.log("friends->", friends);

    return (
        <>
            {
                friends.map((el, idx) => {
                    // frind compent
                    return <UserFriendsComponent key={el._id} {...el} />
                })
            }

        </>

    )

}


const FriendRequestsLists = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(FetchFriendRequests());
    }, []);

    const { friendRequests } = useSelector((state) => state.appe);

    console.log("friendRequests->", friendRequests);

    return (
        <>
            {
                friendRequests.map((el, idx) => {

                    // el struture el ={  request_id , sender ,receiver}
                    // el struture el ={  _id , {_id ,firstname,lastname ,img , status} ,}
                    // frindReq compent
                    return <FriendRequestComponent key={el._id} {...el.sender} id={el._id} />
                })
            }

        </>

    )

}




const FriendsDailogBox = ({ open, handleClose }) => {

    const [value, setvalue] = useState(false);

    const handleChange = (event, newvalue) => {

        setvalue(newvalue);
    }

    return (
        <Dialog fullWidth maxWidth="xs" open={open} onClose={handleClose} keepMounted >

            <Stack direction={'row'} spacing={2} p={1} justifyContent={'center'}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="users" />
                    <Tab label="Friends" />
                    <Tab label="Requests" />
                </Tabs>
            </Stack>
            <DialogContent>
                <Stack sx={{ height: "100%" }}>

                    <Stack spacing={2}>

                        {

                            (() => {

                                switch (value) {
                                    case 0://all user
                                        return <UserLists />;
                                    case 1://all freinds
                                        return <FriendsLists />;
                                    case 2://all req
                                        return <FriendRequestsLists />;

                                    default:
                                        break;
                                }

                            })()
                        }

                    </Stack>

                </Stack>
            </DialogContent>
        </Dialog>
    )
}

export default FriendsDailogBox