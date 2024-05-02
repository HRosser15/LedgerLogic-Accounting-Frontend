import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const fetchJournalEntriesForAccount = async (accountName) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/journalEntries/getByAccountName/${accountName}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch journal entries:', error);
    return [];
  }
};

export const approveJournal = (journalId, status) => {
  return axios.post(`${API_BASE_URL}/journal/approveJournal/${journalId}/${status}`);
};

export const rejectJournal = (journalId, rejectionReason) => {
  const requestData = {
    journalId: journalId,
    rejectionReason: rejectionReason,
  };

  return axios.post(`${API_BASE_URL}/journal/rejectJournal`, requestData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};