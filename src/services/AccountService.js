import axios from "axios";

const BASE_URL = "http://localhost:8080/account";

const addAccount = async (requestData) => {
  try {
    const response = await axios.post(`${BASE_URL}/addAccount`, requestData);
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made, but the server responded with a non-2xx status code
      throw new Error(`Error adding account: ${error.response.data}`);
    } else if (error.request) {
      // The request was made, but no response was received
      throw new Error("No response received from the server.");
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(`Error setting up the request: ${error.message}`);
    }
  }
};

export { addAccount };

export const fetchAccounts = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  console.log("LoggedInUser Information in fetchAccounts:", user);

  if (user) {
    const requestOptions = {
      withCredentials: true,
    };

    return axios.get(`${BASE_URL}/allAccounts`, requestOptions);
  } else {
    console.error("User information not found in local storage");
    return Promise.reject("User information not found");
  }
};
