import CardHistory from './CardHistory';
import ModalTransaction from './ModalTransaction';
import { requestHistoryTransactions, setToken } from '../utils/api';
import { getLocalDataToken, getLocalDataUser } from '../utils/localStorage';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { HistoryTransaction } from '../entities/transaction';
import type { User } from '../entities/user';
import type { MouseEventHandler } from 'react';
import '../styles/home.css';

const CARDS_PER_PAGE = 2;

export default function ContainerHome() {
  const [historyTransactions, setHistory] = useState<HistoryTransaction[]>([]);
  const [prevHistoryTransactions, setPrevHistory] = useState<
    HistoryTransaction[]
  >([]);
  const [user, setUser] = useState<User>();
  const [token, setTokenState] = useState<string>('');
  const [errorHistory, setErrorHistory] = useState<string>();
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState<number>(CARDS_PER_PAGE);
  const [loading, setLoading] = useState(true);
  const [cashInActivate, setCashInActivate] = useState(false);
  const [cashOutActivate, setCashOutActivate] = useState(false);

  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    let requestTransactions: HistoryTransaction[] | string;
    if (user?.accountId) {
      requestTransactions = await requestHistoryTransactions(user.accountId);

      if (typeof requestTransactions === 'object') {
        setHistory(requestTransactions.reverse());
        setLoading(false);
      } else {
        setErrorHistory(requestTransactions);
      }
    }
  }, [user]);

  useEffect(() => {
    if (!getLocalDataToken || !getLocalDataUser) {
      navigate('/login');
    } else {
      setTokenState(getLocalDataToken);
      setUser(JSON.parse(getLocalDataUser));
    }

    setToken(token);
  }, [navigate, token]);

  useEffect(() => {
    fetchData();
  }, [user, fetchData]);

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

  const filterCashIn: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    setLoading(true);

    if (cashInActivate) {
      setHistory(prevHistoryTransactions);
    } else {
      setPrevHistory(historyTransactions);
      const historyFiltered = historyTransactions.filter(
        (transaction) => transaction.creditedAccountId === user?.accountId
      );
      setHistory(historyFiltered);
    }

    setCashInActivate(!cashInActivate);
    setLoading(false);
  };

  const filterCashOut: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    setLoading(true);

    if (cashOutActivate) {
      setHistory(prevHistoryTransactions);
    } else {
      setPrevHistory(historyTransactions);
      const historyFiltered = historyTransactions.filter(
        (transaction) => transaction.debitedAccountId === user?.accountId
      );
      setHistory(historyFiltered);
    }
    setCashOutActivate(!cashOutActivate);
    setLoading(false);
  };

  return errorHistory ? (
    <p>{errorHistory}</p>
  ) : (
    <div className="home-container">
      <ModalTransaction />
      <div>
        <h3 className="title-history">history</h3>
        <div>
          <div>
            <input type="text" />
            <button type="button">search</button>
          </div>
          <button
            type="button"
            onClick={filterCashIn}
            className={`btn ${
              cashInActivate ? 'btn-success' : 'btn-secondary'
            }`}
          >
            cash-in
          </button>
          <button
            type="button"
            onClick={filterCashOut}
            className={`btn ${
              cashOutActivate ? 'btn-success' : 'btn-secondary'
            }`}
          >
            cash-out
          </button>
        </div>
        <div className="container-card-history">
          {historyTransactions &&
            historyTransactions
              .slice(startIndex, endIndex)
              .map((transaction, index) => {
                let typeTransaction: string;
                if (transaction.debitedAccountId === user?.accountId) {
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
      </div>
    </div>
  );
}
