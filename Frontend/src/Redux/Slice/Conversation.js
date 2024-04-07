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

                )


                return {
                    id: el._id, // objectID of Conversation
                    img: faker.image.avatar(),
                    name: `${this_user.firstname} ${this_user.lastname}`,
                    msg: faker.music.songName(),
                    time: "9:36",
                    unread: 0,
                    pinned: true,
                    online: this_user.status === "true" ? "true" : "false",
                }

            })


            state.direct_chat.conversationList = list;
        }
    }
})


export default Slice.reducer;


export function fetchDirectone2oneConversation({ conversation }) {

    return async (dispatch, getState) => {

        dispatch(Slice.actions.fetchDirect121Conversation({ conversation }))

    }
}