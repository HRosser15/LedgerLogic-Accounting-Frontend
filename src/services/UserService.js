import axios from "axios";

const BASE_URL = "http://localhost:8080/users";

export const fetchUsers = () => {
    return axios.get(`${BASE_URL}/allUsers`);
};

export const loginUser = (username, password) => {
    return axios.post("http://localhost:8080/auth/login", {user_id, password });
}

export const activateUser = (userId) => {
  return axios.put(`${BASE_URL}/activate/${userId}`);
};

export const deactivateUser = (userId) => {
  return axios.put(`${BASE_URL}/deactivate/${userId}`);
};
