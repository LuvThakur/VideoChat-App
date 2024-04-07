import { createSlice } from "@reduxjs/toolkit";
import axios from '../../utils/axiosMethod';
import { DecideConversation, ShowAlertSnackbar } from "./SidebarSlice";

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
            state.email = "";
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

            console.log(response); // Handle the response data here

            // Dispatch your success action
            dispatch(Login({ isLoggedIn: true, token: response.data.token }));

            dispatch(ShowAlertSnackbar(response.data.message, "success"));

            console.log("user_id->login", response);
            console.log("user_id->login", response.data.user_id);
            window.localStorage.setItem("user_id", response.data.user_id);


        } catch (error) {
            console.log(error);

            dispatch(ShowAlertSnackbar(error.message, "warning"));

            // Dispatch your error action, or handle errors as needed
        }
    }
}


export function SignOutUserfun() {
    return async (dispatch) => {
        // remove room_id when signout
        dispatch(DecideConversation({ room_id: null }));
        
        window.localStorage.removeItem("user_id");
        dispatch(SignOut())
        dispatch(ShowAlertSnackbar("SingOut Successfully", "success"));


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

            (response) => {
                console.log("resp->", response)
                dispatch(ShowAlertSnackbar(response.data.message, "success"));
            }
        ).catch(
            (error) => {
                console.log("er->", error.response)

                dispatch(ShowAlertSnackbar(error.message, "warning"));

            }
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
                console.log("new-pass", response);

                // Dispatch login action if needed
                dispatch(Login({ isLoggedIn: true, token: response.data.token }));
                dispatch(ShowAlertSnackbar(response.data.message, "success"));

            }
        ).catch(
            (error) => {
                console.log("err->", error.response)
                dispatch(ShowAlertSnackbar(error.message, "warning"));

            }
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
                dispatch(ShowAlertSnackbar(response.data.message, "success"));


            }
        ).catch(
            (error) => {
                console.log("err->", error.response)

                dispatch(AuthSlice.actions.LoadingBar({ isLoading: false, error: true }));
                dispatch(ShowAlertSnackbar(error.message, "warning"));

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
                console.log("user_id->verfity0top", response);
                console.log("user_id->verfity0top", response.data.user_id);
                window.localStorage.setItem("user_id", response.data.user_id);
                dispatch(Login({ isLoggedIn: true, token: response.data.token }));
                dispatch(ShowAlertSnackbar(response.data.message, "success"));
            }

        ).catch(
            (error) => {
                console.log("err->", error.response)
                dispatch(ShowAlertSnackbar(error.message, "warning"));
            }
        )

    }
}