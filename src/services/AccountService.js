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


export const fetchEventLog = () => {
      return axios.get("http://localhost:8080/eventLog/getAll");
};


// Function to parse currentState string
const parseCurrentState = (currentStateString) => {
  // Split the string by commas to get individual property-value pairs
  const keyValuePairs = currentStateString.split(", ");
  // Create an object to store parsed properties
  const parsedState = {};
  // Iterate through keyValuePairs array
  keyValuePairs.forEach(pair => {
    // Split each pair by '=' to separate property and value
    const [key, value] = pair.split("=");
    // Check if both key and value exist before adding to parsedState
    if (key && value) {
      parsedState[key.trim()] = value.trim();
    }
  });
  return parsedState;
};

export const fetchAccountBalancesByDate = async (selectedDate) => {
  try {
    const response = await axios.get("http://localhost:8080/eventLog/getAll");
    const eventLog = response.data;

    // Convert selectedDate to ISO string without time component
    const isoSelectedDate = new Date(selectedDate).toISOString().split('T')[0];

    // Filter event log to only include events before the selected date
    const filteredEventLog = eventLog.filter(event => {
      const eventDate = new Date(event.modificationTime).toISOString().split('T')[0];
      return eventDate <= isoSelectedDate;
    });

    // Collect account details for each event in the filtered event log
    const accountDetailsList = filteredEventLog.map((event) => {
      try {
        // Parse event's currentState to get account balance and other details
        const currentState = parseCurrentState(event.currentState);
        const accountDetails = {
          accountId: currentState.accountId,
          accountName: currentState.accountName,
          accountNumber: currentState.accountNumber,
          category: currentState.category,
          balance: currentState.balance,
          subCategory: currentState.subCategory
          // Add other details as needed
        };
        return accountDetails;
      } catch (error) {
        console.error(`Error parsing currentState for event ${event.id}:`, error);
        return null;
      }
    });

    const filteredAccountDetailsList = accountDetailsList.filter(details => details !== null);

    console.log("Account details list:", accountDetailsList);
    console.log("Account details list:", filteredAccountDetailsList);

    return { data: filteredAccountDetailsList }; // Return the list of account details
  } catch (error) {
    throw error;
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

export const deactivateAccount = async (accountID) => {
  try {
    const response = await axios.patch(`${BASE_URL}/deactivate/${accountID}`)
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