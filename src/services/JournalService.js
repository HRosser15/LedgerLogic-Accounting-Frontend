import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const addJournal = async (journalData, attachedFile, numericUserId) => {
  try {
    const formData = new FormData();
    formData.append('journal', JSON.stringify(journalData));

    if (attachedFile) {
      formData.append('attachedFile', attachedFile);
      formData.append('attachedFileContentType', attachedFile.type);
    }

    // Check if numericUserId is a valid number
    // if (isNaN(numericUserId)) {
    //   console.log('Invalid user ID:', numericUserId);
    //   console.log('Type:', typeof numericUserId);
    //   throw new Error('Invalid user ID');
    // }

    formData.append('userId', 1);

    const response = await axios.post(`${API_BASE_URL}/journal/addJournal`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Failed to add journal:', error);
    throw error;
  }
};



// const getMimeType = (extension) => {
//   switch (extension.toLowerCase()) {
//     case 'jpg':
//     case 'jpeg':
//       return 'image/jpeg';
//     case 'png':
//       return 'image/png';
//     case 'pdf':
//       return 'application/pdf';
//     case 'doc':
//     case 'docx':
//       return 'application/msword';
//     case 'xls':
//     case 'xlsx':
//       return 'application/vnd.ms-excel';
//     case 'csv':
//       return 'text/csv';
//     default:
//       return 'application/octet-stream';
//   }
// };


export const fetchJournalEntriesForAccount = async (accountName) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/journalEntries/getByAccountName/${accountName}`);
    console.log("Journal Entries for Account: ", response.data);
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
  console.log("Journal ID: ", journalId);
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