import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainContext from '../context/MainContext';
import { requestAccess } from '../utils/api';
import {
  validateUsername,
  validatePassword,
} from '../middleware/validateAccess';

export default function Login() {
  const [username, setUsername] = useState('');
  const [inputUsername, setInputUsername] = useState(true);
  const [password, setPassword] = useState('');
  const [inputPassword, setInputPassword] = useState(true);
  const [alertErorr, setAlert] = useState('');

  const { setToken } = useContext(MainContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const login = await requestAccess('/login', { username, password });
    if (!login.token) {
      if (login.status === 400) return setAlert(login.data.message[0].message);
      return setAlert(login.data.error);
    }
    setToken(login.token);
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
    <>
      <h1 className="text-3xl">Login</h1>
      <form>
        <fieldset>
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
          <span className={inputUsername && 'invisible'}>
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
          <span className={inputPassword && 'invisible'}>
            A senha deve ter pelo menos um número e uma letra maiúscula
          </span>
        </fieldset>
        {alertErorr.length > 0 && <span>{alertErorr}</span>}
        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
        <p>or</p>
        <button type="button" onClick={() => navigate('/register')}>
          Sing up
        </button>
      </form>
    </>
  );
}
