import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import { rootReducer, rootPersistConfig } from "./Rootreducer";
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from "react-redux";



const store = configureStore({
    reducer: persistReducer(rootPersistConfig, rootReducer),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false
        })
});


export default store;
const perstore = persistStore(store);

const { dispatch } = store;
// const useSelector = useAppSelector;
// const useDispatch = () => useAppDispatch();

export { perstore ,dispatch};