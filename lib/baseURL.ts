import axios from "axios";


export const questionURL = "http://localhost:1337/";

export const quesBaseURL = axios.create({
    baseURL: questionURL,
});
