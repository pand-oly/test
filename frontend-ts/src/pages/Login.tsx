import MainContext from '../context/MainContext';
import {
  validateUsername,
  validatePassword,
} from '../middleware/validateAccess';
import { requestAccess } from '../utils/api';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import type { MainContextInterface } from '../entities/MainContextInterface';
import type { FormEvent } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [alertErorr, setAlert] = useState('');
  const navigate = useNavigate();

  const { setToken, setUser } = useContext<MainContextInterface>(MainContext);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const login = await requestAccess('/login', { username, password });

    if (typeof login === 'string') {
      return setAlert(login);
    }

    setToken(login.token);
    setUser({ username: login.username, accountId: login.accountId });

    return navigate('/home');
  };

  useEffect(() => {
    if (username.length > 0) {
      if (validateUsername(username)) {
        return setInputUsername('is-valid');
      }
      return setInputUsername('is-invalid');
    }
  }, [username]);

  useEffect(() => {
    if (password.length > 0) {
      if (validatePassword(password)) {
        return setInputPassword('is-valid');
      }
      return setInputPassword('is-invalid');
    }
  }, [password]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="inputUserName" className="form-label">
          Username
        </label>
        <input
          type="text"
          id="inputUserName"
          name="username"
          onChange={({ target }) => setUsername(target.value)}
          value={username}
          className={`form-control ${inputUsername}`}
        />
        <span className="invalid-feedback">
          Username precisa ter no minimo 3 caracteres
        </span>
      </div>
      <div className="mb-3">
        <label htmlFor="inputPassword" className="form-label">
          Password
        </label>
        <input
          type="password"
          id="inputPassword"
          name="password"
          onChange={({ target }) => setPassword(target.value)}
          value={password}
          className={`form-control ${inputPassword}`}
        />
        <span className="invalid-feedback">
          A senha deve ter pelo menos um número e uma letra maiúscula
        </span>
      </div>
      {alertErorr.length > 0 && <span>{alertErorr}</span>}

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      <button
        type="button"
        onClick={() => navigate('/register')}
        className="btn btn-primary"
      >
        Sing up
      </button>
    </form>
  );
}
