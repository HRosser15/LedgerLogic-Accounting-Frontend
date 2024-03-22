import { useParams } from "react-router-dom";

const AccountantViewLedger = () => {
  const { accountNumber } = useParams();

  // Fetch transactions for the account with the given accountNumber

  return (
    <div>
      <h1>Account Ledger for Account {accountNumber}</h1>
      {/* Render the transactions for the account */}
    </div>
  );
};

export default AccountantViewLedger;
