interface transactionProps {
  debitedAccountId: number;
  creditedAccountId: number;
  value: number;
  createdAt: string;
}

interface props {
  transaction: transactionProps;
}

const cardStyle = {
  maxWidth: '18rem',
};

export default function CardHistory({ transaction }: props) {
  const { debitedAccountId, creditedAccountId, value, createdAt } = transaction;

  return (
    <div className="card border-info mb-3" style={cardStyle}>
      <div className="card-header">cash-in/cash-out</div>
      <div className="card-body">
        <h5 className="card-title">Info card title</h5>
        <p className="card-text">
          debitedAccountId: <span>{debitedAccountId}</span>
        </p>
        <p className="card-text">
          creditedAccountId: <span>{creditedAccountId}</span>
        </p>
        <p className="card-text">
          Value: <span>{value}</span>
        </p>
        <p className="card-text">
          Created At: <span>{createdAt}</span>
        </p>
      </div>
    </div>
  );
}
