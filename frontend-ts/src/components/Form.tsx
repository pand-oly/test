import ButtonForms from './ButtonForms';
import FormInput from './FormInput';
import MainContext from '../context/MainContext';
import { requestAccess } from '../utils/api';

import { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import type { MainContextInterface } from '../entities/MainContextInterface';
import type { ButtonProps } from '../entities/buttonType';
import type { FormEvent } from 'react';

type FormProps = {
  label: string;
  extraButton?: ButtonProps;
};

export default function Form({ label, extraButton }: FormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alertError, setAlert] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const { setToken, setUser } = useContext<MainContextInterface>(MainContext);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const responseApi = await requestAccess(location.pathname, {
      username,
      password,
    });

    if (typeof responseApi === 'string') {
      return setAlert(responseApi);
    }

    setToken(responseApi.token);
    setUser({
      username: responseApi.username,
      accountId: responseApi.accountId,
    });

    return navigate('/home');
  };

  return (
    <div className="container_access">
      <h1 className="title_access">{label}</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          id="inputUserName"
          label="Username"
          name="username"
          type="text"
          value={username}
          onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(target.value)
          }
          errorMessage="Username precisa ter no minimo 3 caracteres"
        />
        <FormInput
          id="inputPassword"
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(target.value)
          }
          errorMessage="Username precisa ter no minimo 3 caracteres"
        />

        {alertError.length > 0 && <span>{alertError}</span>}

        <ButtonForms type="submit" label={label} />

        {extraButton && (
          <ButtonForms
            type={extraButton.type}
            label={extraButton.label}
            onClick={extraButton.onClick}
          />
        )}
      </form>
    </div>
  );
}
