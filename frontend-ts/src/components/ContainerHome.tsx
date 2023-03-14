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
  const [user, setUser] = useState<User>();
  const [token, setTokenState] = useState<string>('');
  const [errorHistory, setErrorHistory] = useState<string>();
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState<number>(CARDS_PER_PAGE);

  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    let requestTransactions: HistoryTransaction[] | string;
    if (user?.accountId) {
      requestTransactions = await requestHistoryTransactions(user.accountId);

      if (typeof requestTransactions === 'object') {
        setHistory(requestTransactions.reverse());
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
          <button type="button">cash-in</button>
          <button type="button">cash-out</button>
        </div>
        <div className="container-card-history">
          {historyTransactions &&
            historyTransactions
              .slice(startIndex, endIndex)
              .map((transaction, index) => (
                <div className="card-history-inline" key={index}>
                  <CardHistory transaction={transaction} />
                </div>
              ))}
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
