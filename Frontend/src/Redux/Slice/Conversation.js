import { createSlice } from "@reduxjs/toolkit";
import { faker } from "@faker-js/faker";



const user_id = window.localStorage.getItem("user_id");

const initialState = {

    direct_chat: {

        conversationList: [],
        current_conversation: null,
        current_message: []
    },
    group_chat: {

    }

}

const Slice = createSlice({

    name: "conversation", // name of slice
    initialState,

    reducers: {


        fetchDirect121Conversation: (state, action) => {

            const list = action.payload.conversationList.map((el) => {

                const this_user = el.participants.find(

                    (element) => element._id.toString() !== user_id

                );

                // Get the last message safely
                const lastMessage = el.messages.length > 0 ? el.messages.slice(-1)[0] : null;

                return {
                    id: el._id, // objectID of Conversation,
                    user_id: this_user?._id,
                    img: faker.image.avatar(),
                    name: `${this_user.firstname} ${this_user.lastname}`,
                    msg: lastMessage ? lastMessage.text : " ",
                    time: "9:36",
                    unread: 0,
                    pinned: true,
                    online: this_user.status === "true" ? "true" : "false",
                }

            })


            state.direct_chat.conversationList = list;
        }
        ,

        addDirectConversation: (state, action) => {
            const this_conversation = action.payload.conversationList;

            console.log("this-cov->", action.payload.conversationList);

            const this_user = this_conversation.participants.find(
                (el) => el._id.toString() !== user_id
            );
            state.direct_chat.conversationList.push({
                id: this_conversation._id,
                user_id: this_user._id,
                img: faker.image.avatar(),
                name: `${this_user.firstname} ${this_user.lastname}`,
                msg: faker.music.songName(),
                time: "9:36",
                unread: 0,
                pinned: true,
                online: this_user.status === "Online",
            });
        }

        ,
        updateDirectConversation: (state, action) => {


            // data={}
            // list = list.map((el) = > el.id === data._id  ? data : el)

            const this_user_conversation = action.payload.conversationList;

            state.direct_chat.conversationList = state.direct_chat.conversationList.map((el) => {


                if (el.id !== this_user_conversation._id) {

                    return el;
                }
                else {
                    const this_user = this_user_conversation.participants.find(

                        (elem) => elem._id.toString() !== user_id
                    );

                    return {
                        id: this_user_conversation._id,
                        user_id: this_user._id,
                        img: faker.image.avatar(),
                        name: `${this_user.firstname} ${this_user.lastname}`,
                        msg: faker.music.songName(),
                        time: "9:36",
                        unread: 0,
                        pinned: true,
                        online: this_user.status === "true" ? "true" : "false",

                    }
                }

            })


        }
        ,

        setCurrentConversation(state, action) {
            state.direct_chat.current_conversation = action.payload;
        },

        fetchCurrentMessages(state, action) {
            const messages = action.payload.messages;
            const formatted_messages = messages.map((el) => ({
                id: el._id,
                type: "msg",
                subtype: el.type,
                message: el.text,
                incoming: el.to === user_id,
                outgoing: el.from === user_id,
            }));
            state.direct_chat.current_message = formatted_messages;
        },

        addDirectMessage(state, action) {
            state.direct_chat.current_message.push(action.payload.message);
        }
    }
})


export default Slice.reducer;



export function fetchDirectone2oneConversation({ conversationList }) {

    return async (dispatch, getState) => {

        console.log("direc_covners", conversationList)
        dispatch(Slice.actions.fetchDirect121Conversation({ conversationList }));

    }
}

export function addNewDirectConversation({ conversationList }) {
    return async (dispatch, getState) => {

        dispatch(Slice.actions.addDirectConversation({ conversationList }));
    }
}

export function updateExistingDirectConversation({ conversationList }) {
    return async (dispatch, getState) => {

        dispatch(Slice.actions.updateDirectConversation({ conversationList }));
    }
}


export const SetCurrentConversation = (current_conversation) => {
    return async (dispatch, getState) => {
        dispatch(Slice.actions.setCurrentConversation(current_conversation));
    };
};

export const FetchCurrentMessages = ({ messages }) => {

    console.log("fetc-mesage->>>>", messages);

    return async (dispatch, getState) => {
        dispatch(Slice.actions.fetchCurrentMessages({ messages }));
    }
}


export const AddDirectMessage = (message) => {

    console.log("diret-msg->>", message);

    return async (dispatch, getState) => {
        dispatch(Slice.actions.addDirectMessage({ message }));
    }
}