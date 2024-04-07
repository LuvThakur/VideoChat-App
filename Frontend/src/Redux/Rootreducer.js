import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import Sidebarreducer from './Slice/SidebarSlice';
import AuthReducer from './Slice/AuthSlice';
import ConversationReducer from "./Slice/Conversation";

// Configuration for Redux Persist
const rootPersistConfig = {
    key: 'roots',
    storage,
    keyprefix: 'redux-',

}

//  here combinerReducers are used to combine all reduers into single rootReducer
const rootReducer = combineReducers({
    appe: Sidebarreducer,
    auth: AuthReducer,
    conversation: ConversationReducer

})

export { rootPersistConfig, rootReducer }