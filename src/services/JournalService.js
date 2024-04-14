import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const addJournal = (journal) => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userId = user.userId;
  console.log("LoggedInUser Information in addJournal:", user);
  console.log("User ID: ", userId);

  const requestData = {
    ...journal,
    createdBy: {
      userId: userId,
    },
  };

  return axios.post(`${API_BASE_URL}/journal/addJournal?userId=${userId}`, requestData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const fetchJournalEntriesForAccount = async (accountName) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/journalEntries/getByAccountName/${accountName}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch journal entries:', error);
    return [];
  }
};