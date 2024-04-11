import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const addJournalEntry = (journalEntry) => {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const requestData = {
    ...journalEntry,
    createdBy: {
      userId: user.userId,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  };

  return axios.post(`${API_BASE_URL}/journal/addJournal`, requestData);
};
