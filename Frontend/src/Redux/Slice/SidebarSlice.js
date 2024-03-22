import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    sidebar: {
        isOpen: false,
        type: 'Contact' // type can be varied 
    },

    AlertSnackbar: {
        open: false,
        message: "",
        severity: ""

    }
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
