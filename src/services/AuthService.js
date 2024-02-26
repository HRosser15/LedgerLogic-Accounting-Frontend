import axios from "axios";


const BASE_URL = "http://localhost:8080/auth";


export const registerUser = (userData) => {
  return axios.post(`${BASE_URL}/register`, {
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    passwordContent: userData.passwordContent,
    role: userData.role,
    streetAddress: userData.streetAddress,
    status: userData.status,
    passwordSecurityQuestions: userData.passwordSecurityQuestions,
  });
};


export const forgotPassword = (userData) => {
    return axios.post(`${BASE_URL}/forgotPassword`, userData);
};


export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { username, password });
    console.log("Login successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};
