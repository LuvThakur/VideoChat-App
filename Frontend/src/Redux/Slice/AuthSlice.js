import { createSlice } from "@reduxjs/toolkit";
import axios from '../../utils/axiosMethod';

const initialState = {
    isLoggedIn: false,
    token: "",
    isLoading: false
}

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        Login: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.token = action.payload.token;
        },
        SignOut: (state, action) => {
            state.isLoggedIn = false;
            state.token = "";
        }
    }
});

// Export action creators
export const { Login, SignOut } = AuthSlice.actions;
// Export reducer
export default AuthSlice.reducer;

// Async thunk function
export function LoginUserFun(FormData) {
    return async (dispatch) => { // Need to pass `dispatch` to be able to dispatch actions

        try {
            const response = await axios.post("/auth/login", { ...FormData }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            console.log(response); // Handle the response data here
            // Dispatch your success action
            dispatch(Login({ isLoggedIn: true, token: response.data.token }));

        } catch (error) {
            console.log(error);
            // Dispatch your error action, or handle errors as needed
        }
    }
}


export function SignOutUserfun() {
    return async (dispatch) => {

        dispatch(SignOut())
    }
}

export function ForgotPasswordfun() {

    return async () => {

        

    }

}