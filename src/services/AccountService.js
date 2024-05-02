import axios from "axios";

const BASE_URL = "http://localhost:8080/account";
const API_BASE_URL = "http://localhost:8080";

export const fetchParsedEventLogs = () => {
  return axios.get("http://localhost:8080/eventLog/getAllParsed");
};

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

export const updateAccount = async (accountId, updatedData) => {
  try {
    const url = `${BASE_URL}/updateAccount/${accountId}`;

    const response = await axios.put(url, updatedData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(`Error updating account: ${error.response.data}`);
    } else if (error.request) {
      throw new Error("No response received from the server.");
    } else {
      throw new Error(`Error setting up the request: ${error.message}`);
    }
  }
};

export const fetchEventLog = () => {
      return axios.get("http://localhost:8080/eventLog/getAll");
};


export const fetchAccounts = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};

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


const parseCurrentState = (currentStateString) => {
  const keyValuePairs = currentStateString.split(", ");
  const parsedState = {};
  keyValuePairs.forEach(pair => {
    const [key, value] = pair.split("=");
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

    const isoSelectedDate = new Date(selectedDate).toISOString().split('T')[0];

    const filteredEventLog = eventLog.filter(event => {
      const eventDate = new Date(event.modificationTime).toISOString().split('T')[0];
      return eventDate <= isoSelectedDate;
    });

    const accountDetailsList = filteredEventLog.map((event) => {
      try {
        const currentState = parseCurrentState(event.currentState);
        const accountDetails = {
          accountId: currentState.accountId ? currentState.accountId.toString() : undefined,
          accountName: currentState.accountName || undefined,
          accountNumber: currentState.accountNumber || undefined,
          category: currentState.category || undefined,
          balance: currentState.balance || undefined,
          subCategory: currentState.subCategory || undefined,
          debit: currentState.debit || undefined,
          credit: currentState.credit || undefined
        };
        return accountDetails;
      } catch (error) {
        return null;
      }
    });

    const filteredAccountDetailsList = accountDetailsList.filter(details => details !== null);


    return { data: filteredAccountDetailsList };
  } catch (error) {
    throw error;
  }
};

export const fetchAggregatedAccountBalancesByDateRange = async (startDate, endDate) => {
  try {
    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];

    const response = await axios.get(`${API_BASE_URL}/eventLog/getAggregatedAccountBalancesByDateRange`, {
      params: {
        startDate: formattedStartDate,
        endDate: formattedEndDate
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAccountBalancesByDateRange = async (startDate, endDate) => {
  try {
    const response = await fetchAggregatedAccountBalancesByDateRange(startDate, endDate);
    return { data: response };
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

export const deactivateAccount = async (accountID) => {
  try {
    const response = await axios.patch(`${BASE_URL}/deactivate/${accountID}`)
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made, but the server responded with a non-2xx status code
      throw new Error(`Error deactivating account: ${error.response.data}`);
    } else if (error.request) {
      // The request was made, but no response was received
      throw new Error("No response received from the server.");
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(`Error setting up the request: ${error.message}`);
    }
  }
};

export const reactivateAccount = async (accountID) => {
  try {
    const response = await axios.patch(`${BASE_URL}/reactivate/${accountID}`)
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error("Error reactivating account: " + error.response.data);
    } else if (error.request) {
      // The request was made, but no response was received
      throw new Error("No response received from the server.");
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(`Error setting up the request: ${error.message}`);
    }
  }
};