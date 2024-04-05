import { createSlice } from "@reduxjs/toolkit";
import axios from '../../utils/axiosMethod';


const initialState = {
    sidebar: {
        isOpen: false,
        type: 'Contact' // type can be varied 
    },

    AlertSnackbar: {
        open: false,
        message: "",
        severity: ""

    },
    users: [],
    friends: [],
    friendRequests: [],
    chat_type: null,
    room_id: null
};

const SidebarSlice = createSlice({
    name: 'app',
    initialState,

    reducers: {
        //  action-creators
        toggleSidebar: (state) => {
            state.sidebar.isOpen = !state.sidebar.isOpen;
        },

        typeSidebar: (state, action) => {

            state.sidebar.type = action.payload;
        },

        openSnackbar: (state, action) => {
            state.AlertSnackbar.open = true;
            state.AlertSnackbar.message = action.payload.message;
            state.AlertSnackbar.severity = action.payload.severity;
        },

        closeSnackbar: (state, action) => {

            state.AlertSnackbar.open = false;
            state.AlertSnackbar.message = "";
            state.AlertSnackbar.severity = "";
        },

        updateUsers: (state, action) => {
            state.users = action.payload.users;
        },

        updateFriends: (state, action) => {
            state.friends = action.payload.friends;
        },

        updateFriendRequests: (state, action) => {
            state.friendRequests = action.payload.friendRequests;
        },

        selectConversation: (state, action) => {
            state.chat_type = "individual";
            state.room_id = action.payload.room_id;
        }




    }
});
//  export action-creators
export const { toggleSidebar, typeSidebar } = SidebarSlice.actions;
// export reducers
export default SidebarSlice.reducer;

// Async thunk function
export function ToggleSidebarfun() {
    return async (dispatch, getState) => {
        dispatch(SidebarSlice.actions.toggleSidebar());
    }
};

export function TypeSidebarfun(type) {
    return async (dispatch, getState) => {
        dispatch(SidebarSlice.actions.typeSidebar(type,));
    }
}

export function ShowAlertSnackbar(message, severity) {

    return async (dispatch, getState) => {

        console.log("call show ans open ");
        console.log("cal-message:", message, typeof message);
        console.log("cail-severity:", severity, typeof severity);

        dispatch(SidebarSlice.actions.openSnackbar({ message, severity }));

        // after x second u call close function

        // setTimeout(() => {
        //     dispatch(SidebarSlice.actions.closeSnackbar());
        // }, 50000);
    }

}

export function CloseAlertSnackbar() {
    return async (dispatch, getState) => {

        dispatch(SidebarSlice.actions.closeSnackbar());
    }
}


export function FetchUsers() {
    return async (dispatch, getState) => {

        await axios.get("/user/get-users", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().auth.token}`,

            }
        }).then(
            (response) => {
                console.log("res->", response);
                dispatch(SidebarSlice.actions.updateUsers({ users: response.data.data }));
            }
        ).catch(

            (error) => {
                console.log("er", error);
            }
        )

    }
}

export function FetchFriends() {

    return async (dispatch, getState) => {

        await axios.get("/user/get-friends", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().auth.token}`
            }
        }).then(
            (response) => {

                console.log("fetc-fri", response);

                dispatch(SidebarSlice.actions.updateFriends({ friends: response.data.data }))

            }
        ).catch(
            (error) => {
                console.log("er-frei", error);
            }
        )
    }
}


export function FetchFriendRequests() {

    return async (dispatch, getState) => {
        await axios.get("/user/get-friend-requests", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().auth.token}`
            }

        }).then(
            (response) => {
                console.log("fr-req", response);
                dispatch(SidebarSlice.actions.updateFriendRequests({ friendRequests: response.data.data }))
            }
        ).catch(
            (error) => {
                console.log("fr-req", error);
            }
        )
    }
}

export function DecideConversation({ room_id }) {
    return (dispatch, getState) => {

        dispatch(SidebarSlice.actions.selectConversation({room_id}));
    }
}