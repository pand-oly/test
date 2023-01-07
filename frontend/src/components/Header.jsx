import { useState, useContext } from 'react';
import MainContext from '../context/MainContext';

import '../styles/header.css';
import pigBank from '../public/icons/cofrinho.png';

export default function Header() {
  const [seeBalance, setSeeBalance] = useState(false);
  const { user } = useContext(MainContext);

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
        <button
          type="button"
          onClick={() => setSeeBalance(!seeBalance)}
          className="btn-balance"
        >
          {seeBalance ? 'saldo' : 'Visualizar'}
        </button>
      </div>
      <button type="button">logout</button>
    </section>
  );
}
