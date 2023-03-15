import CardHistory from './CardHistory';
import { useState } from 'react';
import type { HistoryTransaction } from '../entities/transaction';
import type { MouseEventHandler } from 'react';

interface props {
  historyTransactions: HistoryTransaction[];
  loading: boolean;
  accountId: number;
}

const CARDS_PER_PAGE = 2;

export default function ContainerCardHistory({
  historyTransactions,
  loading,
  accountId,
}: props) {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState<number>(CARDS_PER_PAGE);

  const handleCardHistory =
    (buttonType: 'next' | 'prev'): MouseEventHandler<HTMLButtonElement> =>
    (event) => {
      event.preventDefault();

      if (buttonType === 'next' && endIndex < historyTransactions.length) {
        setStartIndex(endIndex);
        setEndIndex(endIndex + CARDS_PER_PAGE);
      } else if (buttonType === 'prev' && startIndex > 0) {
        setStartIndex(startIndex - CARDS_PER_PAGE);
        setEndIndex(endIndex - CARDS_PER_PAGE);
      }
    };

  return (
    <div className="container-card-history">
      {historyTransactions &&
        historyTransactions
          .slice(startIndex, endIndex)
          .map((transaction, index) => {
            let typeTransaction: string;
            if (transaction.debitedAccountId === accountId) {
              typeTransaction = 'cash-out';
            } else {
              typeTransaction = 'cash-in';
            }

            return loading ? (
              <p>Loading...</p>
            ) : (
              <div className="card-history-inline" key={index}>
                <CardHistory
                  transaction={transaction}
                  typeTransaction={typeTransaction}
                />
              </div>
            );
          })}
      <button type="button" onClick={handleCardHistory('prev')}>
        prev
      </button>
      <button type="button" onClick={handleCardHistory('next')}>
        next
      </button>
    </div>
  );
}
