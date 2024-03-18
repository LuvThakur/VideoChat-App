import axios from 'axios';

import { Base_URL } from "../config";


const instance = axios.create({
    baseURL: Base_URL,
});


// axios.interceptors.response.use((response) => response, (error) => (Promise.reject(error.response && error.response.data) || "something wrong"))
axios.interceptors.response.use(
    function (response) { return response },
    function (error) {
        return Promise.reject((error.response && error.response.data) || "something wrong")
    }
);


export default instance;