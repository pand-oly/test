import { useEffect, useState, useContext } from 'react';
import CardHistory from './CardHistory';
import { requestHistoryTransactions, setToken } from '../utils/api';
import MainContext from '../context/MainContext';

import '../styles/home.css';
import PopupTransaction from './PopupTransaction';

export default function ContainerHome() {
  const [historyTransactions, setHistory] = useState([]);
  const [limitHistory, setLimit] = useState(0);

  const { user, token } = useContext(MainContext);

  useEffect(() => {
    setToken(token);
    const fetchData = async () => {
      const arrayTransactions = await requestHistoryTransactions(
        user.accountId
      );
      setHistory(arrayTransactions.reverse());
    };
    fetchData();
  }, []);

  const seeMore = (e) => {
    e.preventDefault();
    setLimit(limitHistory + 3);
  };

  const seeLess = (e) => {
    e.preventDefault();
    setLimit(limitHistory - 3);
  };

  return (
    <div className="main-container-home">
      <div className="container-btn-home">
        <PopupTransaction />
      </div>
      <div>
        <h3 className="title-history">history</h3>
        <div className="container-filter-history">
          <div className="container-input-search">
            <input type="text" /> <button type="button">search</button>
          </div>
          <button type="button" className="btn-filter-history">
            cash-in
          </button>
          <button type="button" className="btn-filter-history">
            cash-out
          </button>
        </div>
        <div className="container-card-history">
          {limitHistory > 0 && (
            <button type="button" onClick={seeLess}>
              see less...
            </button>
          )}

          {historyTransactions &&
            historyTransactions.map((transaction, index) => {
              /*eslint-disable-line*/ while (
                index >= limitHistory &&
                index < limitHistory + 3
              ) {
                return <CardHistory transaction={transaction} index={index} />;
              }
              return <span />;
            })}

          {limitHistory <= historyTransactions.length && (
            <button type="button" onClick={seeMore}>
              see more...
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
