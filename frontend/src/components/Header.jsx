import { useState } from 'react';
import pigBank from '../public/icons/cofrinho.png';

export default function Header() {
  const [seeBalance, setSeeBalance] = useState(false);
  return (
    <section>
      <img alt="icon-pig-bank" src={pigBank} />
      <div>
        Welcome: <span>username</span>
      </div>
      <div>
        Account: <sapn>account ID</sapn>
      </div>
      <div>
        Balance:{' '}
        <button type="button" onClick={() => setSeeBalance(!seeBalance)}>
          {seeBalance ? 'saldo' : 'Visualizar'}
        </button>
      </div>
      <button type="button">logout</button>
    </section>
  );
}
