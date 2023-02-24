import MainContext from './MainContext';
import { useState, useMemo } from 'react';
import type { MainContextInterface } from '../entities/MainContextInterface';
import type { User } from '../entities/user';

type MainProviderProps = {
  children: React.ReactNode;
};

const MainProvider = ({ children }: MainProviderProps) => {
  const [token, setToken] = useState<string>('');
  const [user, setUser] = useState<User>({
    username: '',
    accountId: undefined,
  });

  const contextValue: MainContextInterface = useMemo(
    () => ({
      token,
      setToken,
      user,
      setUser,
    }),
    [token, setToken, user, setUser]
  );

  return (
    <MainContext.Provider value={contextValue}>{children}</MainContext.Provider>
  );
};

export default MainProvider;
