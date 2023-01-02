import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestAccess } from '../utils/api';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alertErorr, setAlert] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const login = await requestAccess('/login', { username, password });
    if (!login.token) {
      if (login.status === 400) return setAlert(login.data.message[0].message);
      return setAlert(login.data.error);
    }
    return navigate('/home');
  };

  return (
    <>
      <h1>Login</h1>
      <form>
        <fieldset>
          <legend>Username</legend>
          <input
            type="text"
            name="username"
            onChange={({ target }) => setUsername(target.value)}
            value={username}
          />
          <legend>Password</legend>
          <input
            type="password"
            name="password"
            onChange={({ target }) => setPassword(target.value)}
            value={password}
          />
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
