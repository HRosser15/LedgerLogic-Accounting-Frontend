import React, { createContext, useState } from 'react';

const JournalContext = createContext();

const JournalProvider = ({ children }) => {
  const [journalEntries, setJournalEntries] = useState([]);

  const addJournalEntry = (entry) => {
    setJournalEntries([...journalEntries, entry]);
  };

  return (
    <JournalContext.Provider value={{ journalEntries, addJournalEntry }}>
      {children}
    </JournalContext.Provider>
  );
};

export { JournalContext, JournalProvider };
