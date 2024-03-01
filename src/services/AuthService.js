import axios from "axios";


const BASE_URL = "http://localhost:8080/auth";


export const registerUser = (userData) => {
  return axios.post(`${BASE_URL}/register`, {
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    passwordContent: userData.passwordContent,
    role: userData.role,
    birthDay: userData.birthDay,
    streetAddress: userData.streetAddress,
    status: userData.status,
    passwordSecurityQuestions: userData.passwordSecurityQuestions,
  });
};

export const getSecurityQuestions = async (email) => {
  try {
    const response = await axios.get(`${BASE_URL}/forgotPassword/passwordSecurityQuestion?email=${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching security questions:", error);
    throw error;
  }
};

export const verifySecurityAnswer = async (email, questionContent, answer) => {
  try {
    const response = await axios.post(`/forgotPassword/verifyAnswer`, {
      email,
      questionContent,
      answer,
    });
    return response.data;
  } catch (error) {
    console.error("Error verifying security answer:", error);
    throw error;
  }
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
