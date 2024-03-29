import React from "react";

const SearchAccounts = ({ accounts, onAccountSelect }) => {
  const handleAccountSelect = (accountNumber) => {
    onAccountSelect(accountNumber);
  };

  return (
    <div>
      <h3>Search for an account:</h3>
      <ul>
        {accounts.map((account) => (
          <li key={account.accountNumber}>
            <span
              onClick={() => handleAccountSelect(account.accountNumber)}
              style={{ cursor: "pointer", textDecoration: "underline" }}
            >
              {account.accountName} ({account.accountNumber})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchAccounts;
