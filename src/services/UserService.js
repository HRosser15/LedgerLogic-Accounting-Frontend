import axios from "axios";

const BASE_URL = "http://localhost:8080/users";

export const fetchUsers = () => {
    return axios.get(`${BASE_URL}/allUsers`);
};

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post("http://localhost:8080/auth/login", { username, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const activateUser = (userId) => {
  return axios.put(`${BASE_URL}/activate/${userId}`);
};

export const deactivateUser = (userId) => {
  return axios.put(`${BASE_URL}/deactivate/${userId}`);
};

export const suspendUser = (userId, suspensionStartDate, suspensionEndDate) => {
  return axios.put(`${BASE_URL}/suspend/${userId}`);
}
