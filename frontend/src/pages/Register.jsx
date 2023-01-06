import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainContext from '../context/MainContext';
import { requestAccess } from '../utils/api';
import {
  validateUsername,
  validatePassword,
} from '../middleware/validateAccess';

import '../styles/access.css';
import pigBank from '../public/icons/cofrinho.png';

export default function Register() {
  const [username, setUsername] = useState('');
  const [inputUsername, setInputUsername] = useState(true);
  const [password, setPassword] = useState('');
  const [inputPassword, setInputPassword] = useState(true);
  const [alertErorr, setAlert] = useState('');

  const { setToken, setUser } = useContext(MainContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const register = await requestAccess('/register', { username, password });

    if (!register.token) {
      if (register.status === 400)
        return setAlert(register.data.message[0].message);
      return setAlert(register.data.error);
    }

    setToken(register.token);
    setUser({ username: register.username, accountId: register.accountId });

    return navigate('/home');
  };

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

  return (
    <section className="main_container_access">
      <img src={pigBank} alt="icon-pig-bank" className="icon_access" />
      <div className="container_access">
        <h1 className="title_access">Register</h1>
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
            Login
          </button>
        </form>
      </div>
    </section>
  );
}
