import axios from "axios";

const API_BASE_URL = "http://localhost:8080/account";

const addAccount = async (requestData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/addAccount`, requestData);
    return response.data;
  } catch (error) {
    throw new Error(`Error adding account: ${error.message}`);
  }
};

export { addAccount };