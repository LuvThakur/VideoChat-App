import { createSlice } from "@reduxjs/toolkit";
import {dispatch} from '../Store';


const initialState = {
    sidebar: {
        isopen: false,
        type: 'Contact' // type can be varied 
    }
};

const SidebarSlice = createSlice({
    name: 'app',
    initialState,

    reducers: {
        //  action-creators
        toggleSidebar: (state) => {
            state.sidebar.isopen = !state.sidebar.isopen;
        },

        typeSidebar: (state, action) => {
            state.sidebar.type = action.payload.type;
        }
    }
});
//  export action-creators
export const { toggleSidebar, typeSidebar } = SidebarSlice.actions;
// export reducers
export default SidebarSlice.reducer;

// Async thunk function
export function ToggleSidebarfun() {
    return async () => {
        dispatch(SidebarSlice.actions.toggleSidebar());
    }
};

export function TypeSidebarfun(type) {
    return async () => {
        dispatch(SidebarSlice.actions.typeSidebar(type,));
    }
}

