import pigBank from '../assets/icons/cofrinho.png';
import { requestBalance, setToken } from '../utils/api';
import { getLocalDataUser, getLocalDataToken } from '../utils/localStorage';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../entities/user';
import type { MouseEventHandler } from 'react';

const DECIMAL_LIMIT = 2;

export default function Header() {
  const [seeBalance, setSeeBalance] = useState<boolean>(false);
  const [valueBalance, setBalance] = useState<string>('Balance');
  const [user, setUser] = useState<User>();
  const [token, setTokenState] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    if (!getLocalDataToken || !getLocalDataUser) {
      navigate('/login');
    } else {
      setTokenState(getLocalDataToken);
      setUser(JSON.parse(getLocalDataUser));
    }
  }, [navigate]);

  const showBalance: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();

    setToken(token);

    if (user?.accountId) {
      const request = await requestBalance(String(user.accountId));
      if (typeof request != 'string') {
        setBalance(Number(request.balance).toFixed(DECIMAL_LIMIT));
        return setSeeBalance(!seeBalance);
      }
    }
  };

  return (
    <nav className="navbar bg-dark text-bg-primary">
      <img
        alt="icon-pig-bank"
        src={pigBank}
        className=""
        width="40"
        height="40"
      />
      <div>
        Welcome: <span>{user?.username}</span>
      </div>
      <div>
        Account: <span>{user?.accountId}</span>
      </div>
      <button type="button" onClick={showBalance}>
        {seeBalance ? valueBalance : 'Balance'}
      </button>
      <button type="button">logout</button>
    </nav>
  );
}
