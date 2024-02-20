import axios from "axios";

const BASE_URL = "http://localhost:8080/auth";

export const registerUser = (userData) => {
    return axios.post(`${BASE_URL}/register`, userData);
};

export const forgotPassword = (userData) => {
    return axios.post(`${BASE_URL}/forgotPassword`, userData);
};

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { username, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};