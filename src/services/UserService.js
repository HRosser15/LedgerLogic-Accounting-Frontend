import axios from "axios";

const BASE_URL = "http://localhost:8080/users";

export const fetchUsers = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  console.log("User Information in fetchUsers:", user);

  if (user) {
    // HEADERS REMOVED AS THEY MAY NOT BE
    // const headers = {
    //   "username": user.username,
    //   "role": user.role,
    // };

    // Include withCredentials in the request options
    const requestOptions = {
      withCredentials: true,
      // headers: {
      //   ...headers,
      //   'Content-Type': 'application/json',
      // },
    };

    return axios.get(`${BASE_URL}/allUsers`, requestOptions);
  } else {
    console.error("User information not found in local storage");
    return Promise.reject("User information not found");
  }
};

export const fetchExpiredPasswords = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  if (user) {
    const requestOptions = {
      withCredentials: true,
    };

    return axios.get(`${BASE_URL}/getExpiredPasswords`, requestOptions);
  } else {
    console.error("User information not found in local storage");
    return Promise.reject("User information not found");
  }
};

export const activateUser = (userId) => {
  return axios.put(`${BASE_URL}/activate/${userId}`);
};

export const deactivateUser = (userId) => {
  return axios.put(`${BASE_URL}/deactivate/${userId}`);
};

export const suspendUser = (userId, suspensionStartDate, suspensionEndDate) => {
  return axios.put(`${BASE_URL}/suspend/${userId}`, {
    suspensionStartDate: suspensionStartDate,
    suspensionEndDate: suspensionEndDate,
  });
};
export const updateUserInfo = async (formData) => {
  try {
    const response = await axios.put(`${BASE_URL}/update/${formData.userId}`, formData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};