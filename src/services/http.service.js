import axios from "axios";

axios.defaults.baseURL = "https://000jsonplaceholder.typicode.com/";
const httpService = {
    get: axios.get,
};

export default httpService;
