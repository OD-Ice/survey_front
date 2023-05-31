import axios from "axios";

export const Service = axios.create({
    timeout: 7000,
    baseURL: "",
    headers: {
        "Content-Type": "application/json"
    }
})