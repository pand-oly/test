import PropType from 'prop-types';

import '../styles/home.css';

export default function CardHistory({ transaction, index }) {
  const { debitedAccountId, creditedAccountId, value, createdAt } = transaction;

  return (
    <div className="card-history" key={index}>
      <h3>cash-in/cash-out</h3>
      <p>
        debitedAccountId: <span>{debitedAccountId}</span>
      </p>
      <p>
        creditedAccountId: <span>{creditedAccountId}</span>
      </p>
      <p>
        Value: <span>{value}</span>
      </p>
      <p>
        Created At: <span>{createdAt}</span>
      </p>
    </div>
  );
}

CardHistory.propTypes = {
  transaction: PropType.shape({
    debitedAccountId: PropType.number.isRequired,
    creditedAccountId: PropType.number.isRequired,
    value: PropType.number.isRequired,
    createdAt: PropType.string.isRequired,
  }).isRequired,
  index: PropType.number.isRequired,
};
