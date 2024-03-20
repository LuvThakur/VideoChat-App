import { createSlice } from "@reduxjs/toolkit";
import axios from '../../utils/axiosMethod';

const initialState = {
    isLoggedIn: false,
    token: "",
    email: "",
    isLoading: false,
    error: false,
}

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {


        LoadingBar: (state, action) => {
            state.isLoading = action.payload.isLoading;
            state.error = action.payload.error;
        },

        Login: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.token = action.payload.token;
        },
        SignOut: (state, action) => {
            state.isLoggedIn = false;
            state.token = "";
            state.email="";
        },

        UpdateRegisterEmail: (state, action) => {
            state.email = action.payload.email;
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

            // console.log(response); // Handle the response data here
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

export function ForgotPasswordfun(FormData) {

    return async (dispatch) => {

        await axios.post("/auth/forget-password",
            { ...FormData },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }

        ).then(

            (response) => console.log("resp->", response)

        ).catch(
            (error) => console.log("er->", error.response)
        )
    }

}


export function ResetPasswordfun(FormData) {
    return async (dispatch, getState) => {

        await axios.post("/auth/reset-password", FormData, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(

            (response) => {
                // console.log("new-pass", response);

                // Dispatch login action if needed
                dispatch(Login({ isLoggedIn: true, token: response.data.token }));
            }
        ).catch(
            (error) =>
                console.log("err->", error.response)
        )
    };
}


export function Registerfun(FormData) {

    return async (dispatch, getState) => {

        dispatch(AuthSlice.actions.LoadingBar({ isLoading: true, error: false }));

        await axios.post("/auth/register", FormData,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).then(

            (response) => {
                console.log("Reg-pass", response);

                // Dispatch login action if needed
                dispatch(AuthSlice.actions.UpdateRegisterEmail({ email: FormData.email }));
                dispatch(AuthSlice.actions.LoadingBar({ isLoading: false, error: false }));

            }
        ).catch(
            (error) => {
                console.log("err->", error.response)

                dispatch(AuthSlice.actions.LoadingBar({ isLoading: false, error: true }));
            }


        ).finally(

            () => {

                if (!getState().auth.error) {
                    console.log("fin2");
                    window.location.href = "/auth/verify-otp";
                }
            }

        )
    }

}


export function VerifyOtpfun(FormData) {

    return async (dispatch, getState) => {

        console.log("first", FormData);
        await axios.post("/auth/verify-otp", FormData,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).then(

            (response) => {
                console.log("new-pass", response);

                // Dispatch login action if needed
                dispatch(Login({ isLoggedIn: true, token: response.data.token }));
            }
        ).catch(
            (error) =>
                console.log("err->", error.response)
        )

    }
}