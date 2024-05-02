import React, { createContext, useState } from "react";
// import { addJournal as addJournalService } from "../src/services/JournalService";

export const JournalContext = createContext();

export const JournalProvider = ({ children }) => {
  const [journalEntries, setJournalEntries] = useState([]);

  const addJournal = async (journal) => {
    try {
      const response = await addJournalService(journal);
      if (response && response.data) {
        // Assuming the API returns the created journal in the response
        setJournalEntries([...journalEntries, response.data]);
      } else {
        console.error("Failed to add journal: Invalid response data");
      }
    } catch (error) {
      console.error("Failed to add journal:", error);
    }
  };

  return (
    <JournalContext.Provider value={{ journalEntries, addJournal }}>
      {children}
    </JournalContext.Provider>
  );
};
