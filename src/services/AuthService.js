import axios from "axios";

const BASE_URL = "http://localhost:8080/auth";

export const registerUser = (userData) => {
    return axios.post(`${BASE_URL}/register`, userData);
};
