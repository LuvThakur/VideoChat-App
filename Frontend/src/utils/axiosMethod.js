import axios from 'axios';
import { Base_URL } from "../config";
import isInternetConnected from './internetconnection';

const instance = axios.create({
    baseURL: Base_URL,
});

instance.interceptors.request.use(async function (config) {
    const isConnected = await isInternetConnected();
    if (!isConnected) {
        throw new Error('No internet connection');
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject((error.response && error.response.data) || "Something went wrong");
    }
);

export default instance;
