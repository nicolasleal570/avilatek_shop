import axios from "axios";
import { endpoint } from "./urls";

export const authAxios = axios.create({
    baseURL: endpoint,
    headers: {
        Authorization: `Token ${localStorage.getItem("token")}`
    }
});

export const publicAxios = axios.create({
    baseURL: endpoint,
});