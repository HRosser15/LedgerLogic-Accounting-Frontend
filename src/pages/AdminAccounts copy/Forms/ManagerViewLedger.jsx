import { useParams } from "react-router-dom";

const ManagerViewLedger = () => {
  const { accountNumber } = useParams();

  // Fetch transactions for the account with the given accountNumber

  return (
    <div>
      <h1>Manager View: Account Ledger for Account {accountNumber}</h1>
      {/* Render the transactions for the account */}
    </div>
  );
};

export default ManagerViewLedger;
