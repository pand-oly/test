import { createContext } from 'react';
import type { MainContextInterface } from '../entities/MainContextInterface';

const MainContext = createContext<MainContextInterface>({
  token: '',
  setToken: () => {},
  user: { username: '', accountId: undefined },
  setUser: () => {},
});

export default MainContext;
