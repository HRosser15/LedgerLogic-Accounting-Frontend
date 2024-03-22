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

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post("http://localhost:8080/auth/login", {
      username,
      password,
    });
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
  return axios.put(`${BASE_URL}/suspend/${userId}`, {
    suspensionStartDate: suspensionStartDate,
    suspensionEndDate: suspensionEndDate,
  });
};
