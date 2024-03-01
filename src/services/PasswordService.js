import axios from "axios";

const BASE_URL = "http://localhost:8080/forgotPassword";

export const getSecurityQuestions = async (email) => {
  try {
    const response = await axios.get(`${BASE_URL}/passwordSecurityQuestion?email=${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching security questions:", error);
    throw error;
  }
};

export const verifySecurityAnswer = async (email, questionContent, answer) => {
  try {
    console.error("Error verifying security answer:", error);
    console.log("email: ", email);
    console.log("questionContent: ", questionContent);
    console.log("answer: ", answer);
    const response = await axios.post(`${BASE_URL}/verifyAnswer`, {
      email,
      questionContent,
      answer,
    });
    return response.data;
  } catch (error) {
    console.error("Error verifying security answer:", error);
    console.log("email: ", email);
    console.log("questionContent: ", questionContent);
    console.log("answer: ", answer);
    throw error;
  }
};