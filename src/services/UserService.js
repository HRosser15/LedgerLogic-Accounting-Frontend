import axios from "axios";

const BASE_URL = "http://localhost:8080/users";

export const fetchUsers = () => {
    return axios.get(`${BASE_URL}/allUsers`);
};
