import { useState } from 'react';

import '../styles/header.css';
import pigBank from '../public/icons/cofrinho.png';

export default function Header() {
  const [seeBalance, setSeeBalance] = useState(false);
  return (
    <section className="main-container-header">
      <img alt="icon-pig-bank" src={pigBank} className="icon-header" />
      <div>
        Welcome: <span>username</span>
      </div>
      <div>
        Account: <sapn>account ID</sapn>
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
