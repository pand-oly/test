import { useState, useContext, useEffect } from 'react';
import PropType from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import MainContext from '../context/MainContext';
import { requestAccess } from '../utils/api';
import {
  validateUsername,
  validatePassword,
} from '../middleware/validateAccess';
import { setLocalData } from '../utils/localStorage';

import '../styles/access.css';
import pigBank from '../public/icons/cofrinho.png';

export default function Access({ title }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alertErorr, setAlert] = useState('');
  const [inputUsername, setInputUsername] = useState(true);
  const [inputPassword, setInputPassword] = useState(true);

  const { setToken, setUser } = useContext(MainContext);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (username.length > 0) {
      setInputUsername(validateUsername(username));
    }
  }, [username]);

  useEffect(() => {
    if (password.length > 0) {
      setInputPassword(validatePassword(password));
    }
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const access = await requestAccess(pathname, { username, password });
    if (!access.token) {
      if (access.status === 400)
        return setAlert(access.data.message[0].message);
      return setAlert(access.data.error);
    }

    setToken(access.token);
    setUser({ username: access.username, accountId: access.accountId });
    setLocalData('token', access.token);
    setLocalData('username', access.username);
    setLocalData('accountId', access.accountId);
    return navigate('/home');
  };

  return (
    <section className="main_container_access">
      <img src={pigBank} alt="icon-pig-bank" className="icon_access" />
      <div className="container_access">
        <h1 className="title_access">{title}</h1>
        <form className="items-conter" onSubmit={handleSubmit}>
          <fieldset className="container_access_fieldset">
            <legend>Username</legend>
            <input
              type="text"
              name="username"
              onChange={({ target }) => setUsername(target.value)}
              value={username}
              className={`input_access ${
                inputUsername ? 'focus:border-blue-400' : 'focus:border-red-400'
              }`}
            />
            <span className={`${inputUsername && 'invisible'} span_input`}>
              Username precisa ter no minimo 3 caracteres
            </span>
            <legend>Password</legend>
            <input
              type="password"
              name="password"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
              className={`input_access ${
                inputPassword ? 'focus:border-blue-400' : 'focus:border-red-400'
              }`}
            />
            <span className={`${inputPassword && 'invisible'} span_input`}>
              A senha deve ter pelo menos um número e uma letra maiúscula
            </span>
          </fieldset>

          {alertErorr.length > 0 && <span>{alertErorr}</span>}

          <button type="submit" className="button_access bg-pink-500">
            {pathname === '/login' ? 'Login' : 'Register'}
          </button>

          {pathname === '/login' && (
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="button_access bg-gray-500"
            >
              Sing up
            </button>
          )}
        </form>
      </div>
    </section>
  );
}

Access.propTypes = {
  title: PropType.string.isRequired,
};
