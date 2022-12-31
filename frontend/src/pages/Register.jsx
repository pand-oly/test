import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
  };

  return (
    <>
      <h1>Register</h1>
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
        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </>
  );
}

export default Register;
