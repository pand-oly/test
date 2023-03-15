import ContainerCardHistory from './ContainerCardHistory';
import SectionFiltersHistory from './SectionFiltersHistory';
import { requestHistoryTransactions, setToken } from '../utils/api';
import { getLocalDataToken, getLocalDataUser } from '../utils/localStorage';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { HistoryTransaction } from '../entities/transaction';
import type { User } from '../entities/user';
import type { MouseEventHandler } from 'react';
import '../styles/home.css';

export default function ContainerHistory() {
  const [historyTransactions, setHistory] = useState<HistoryTransaction[]>([]);
  const [prevHistoryTransactions, setPrevHistory] = useState<
    HistoryTransaction[]
  >([]);
  const [user, setUser] = useState<User>();
  const [errorHistory, setErrorHistory] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [cashInActivate, setCashInActivate] = useState(false);
  const [cashOutActivate, setCashOutActivate] = useState(false);

  const [token, setTokenState] = useState<string>('');

  const navigate = useNavigate();

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
    const fetchData = async () => {
      let requestTransactions: HistoryTransaction[] | string;
      if (user?.accountId) {
        requestTransactions = await requestHistoryTransactions(user.accountId);

        if (typeof requestTransactions === 'object') {
          setHistory(requestTransactions.reverse());
          setPrevHistory(requestTransactions);
          setLoading(false);
        } else {
          setErrorHistory(requestTransactions);
        }
      }
    };

    fetchData();
  }, [user]);

  const filterCashIn: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    setLoading(true);

    if (cashOutActivate) {
      setHistory(prevHistoryTransactions);
      setCashOutActivate(!cashOutActivate);
    }

    if (cashInActivate) {
      setHistory(prevHistoryTransactions);
    } else {
      const historyFiltered = prevHistoryTransactions.filter(
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

    if (cashInActivate) {
      filterCashIn(event);
      setLoading(true);
    }

    if (cashOutActivate) {
      setHistory(prevHistoryTransactions);
    } else {
      const historyFiltered = prevHistoryTransactions.filter(
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
    <div>
      <h3 className="title-history">history</h3>
      <SectionFiltersHistory
        cashInActivate={cashInActivate}
        cashOutActivate={cashOutActivate}
        filterCashInProps={filterCashIn}
        filterCashOutProps={filterCashOut}
      />
      <ContainerCardHistory
        accountId={user?.accountId as number}
        historyTransactions={historyTransactions}
        loading={loading}
      />
    </div>
  );
}
