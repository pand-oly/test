import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MainContext from '../context/MainContext';
import { requestBalance, setToken } from '../utils/api';

import '../styles/header.css';
import pigBank from '../public/icons/cofrinho.png';

export default function Header() {
  const [seeBalance, setSeeBalance] = useState(false);
  const [valueBalance, setBalance] = useState(0);
  const { user, token } = useContext(MainContext);

  const navigate = useNavigate();

  const showBalance = async (e) => {
    e.preventDefault();

    setToken(token);
    const balance = await requestBalance(user.accountId);
    if (!balance.balance) {
      setBalance('invalid'); //! melhorar depois
    }
    setBalance(Number(balance.balance).toFixed(2));
    return setSeeBalance(!seeBalance);
  };

  const logout = (e) => {
    e.preventDefault();

    localStorage.clear();
    navigate('/login');
  };

  return (
    <section className="main-container-header">
      <img alt="icon-pig-bank" src={pigBank} className="icon-header" />
      <div>
        Welcome: <span>{user.username}</span>
      </div>
      <div>
        Account: <sapn>{user.accountId}</sapn>
      </div>
      <div>
        Balance:{' '}
        <button type="button" onClick={showBalance} className="btn-balance">
          {seeBalance ? valueBalance : 'Visualizar'}
        </button>
      </div>
      <button type="button" onClick={logout}>
        logout
      </button>
    </section>
  );
}
