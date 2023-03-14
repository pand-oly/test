import CardHistory from './CardHistory';
import ModalTransaction from './ModalTransaction';
import { requestHistoryTransactions, setToken } from '../utils/api';
import { getLocalDataToken, getLocalDataUser } from '../utils/localStorage';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { HistoryTransaction } from '../entities/transaction';
import type { User } from '../entities/user';

import '../styles/home.css';

export default function ContainerHome() {
  const [historyTransactions, setHistory] = useState<HistoryTransaction[]>();
  const [user, setUser] = useState<User>();
  const [token, setTokenState] = useState<string>('');
  const [errorHistory, setErrorHistory] = useState<string>();

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

  return errorHistory ? (
    <p>{errorHistory}</p>
  ) : (
    <div className="home-container">
      <ModalTransaction />
      <div>
        <h3 className="title-history">history</h3>
        <div className="container-filter-history">
          <div className="container-input-search">
            <input type="text" />
            <button type="button">search</button>
          </div>
          <button type="button" className="btn-filter-history">
            cash-in
          </button>
          <button type="button" className="btn-filter-history">
            cash-out
          </button>
        </div>
        <div className="container-card-history">
          {historyTransactions &&
            historyTransactions.map((transaction, index) => (
              <CardHistory transaction={transaction} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
}
