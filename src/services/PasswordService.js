import axios from "axios";

const BASE_URL = "http://localhost:8080/forgotPassword";

export const getSecurityQuestions = async (email) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/passwordSecurityQuestion?email=${email}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching security questions:", error);
    throw error;
  }
};

export const verifySecurityAnswer = async (email, questionContent, answer) => {
  try {
    const response = await axios.post(`${BASE_URL}/verifyAnswer`, null, {
      params: {
        email: email,
        questionContent: questionContent,
        answer: answer,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error verifying security answer:", error);
    throw error;
  }
};

export const resetPassword = async (email, newPasswordContent) => {
  try {
    const response = await axios.post(`${BASE_URL}/resetPassword`, null, {
      params: {
        email: email,
        newPasswordContent: newPasswordContent,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};
// export const resetPassword = async (email, newPasswordContent) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/resetPassword`, {
//       email: email,
//       newPasswordContent: newPasswordContent,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error resetting password:", error);
//     throw error;
//   }
// };
