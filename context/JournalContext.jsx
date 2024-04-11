import React, { createContext, useState } from "react";
import { addJournalEntry } from "../src/services/JournalService";

export const JournalContext = createContext();

export const JournalProvider = ({ children }) => {
  const [journalEntries, setJournalEntries] = useState([]);

  const addJournal = async (journalEntry) => {
    try {
      const response = await addJournalEntry(journalEntry);
      setJournalEntries([...journalEntries, response.data]);
    } catch (error) {
      console.error("Failed to add journal entry:", error);
    }
  };

  return (
    <JournalContext.Provider value={{ journalEntries, addJournal }}>
      {children}
    </JournalContext.Provider>
  );
};
