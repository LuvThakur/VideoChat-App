import React, { useState } from 'react';
import { Dialog, Typography, Stack, Tabs, Tab, DialogContent } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { FetchFriendRequests, FetchFriends, FetchUsers } from '../../Redux/Slice/SidebarSlice';
import { useEffect } from 'react';


const UserLists = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(FetchUsers());
    }, []);

    const { users } = useSelector((state) => state.app);

    return (
        <>
            {

                users.map((el, idx) => {
                    // RenderCompnent
                    return <> </>
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

    const { friends } = useSelector((state) => state.app);


    return (
        <>
            {
                friends.map((el, idx) => {
                    // frind compent
                    return <> </>
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

    const { friendRequests } = useSelector((state) => state.app);


    return (
        <>
            {
                friendRequests.map((el, idx) => {
                    // frindReq compent
                    return <> </>
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
                    <Tab label="Requests" />
                    <Tab label="Friends" />
                </Tabs>
            </Stack>
            <DialogContent>
                <Stack sx={{ height: "100%" }}>

                    <Stack spacing={2}>

                        {

                            (() => {

                                switch (value) {
                                    case 0://all user
                                        return UserLists;
                                    case 1://all freinds
                                        return FriendsLists;
                                    case 2://all req
                                        return FriendRequestsLists;

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