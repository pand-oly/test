import { useState, useMemo, useEffect } from 'react';
import Proptypes from 'prop-types';
import MainContext from './MainContext';
import { getLocalData } from '../utils/localStorage';

function MainProvider({ children }) {
  const [token, setToken] = useState('');
  const [user, setUser] = useState({ username: '', accountId: null });

  useEffect(() => {
    const username = getLocalData('username');
    const accountId = getLocalData('accountId');
    const localStorageToken = getLocalData('token');

    setUser({ username, accountId });
    setToken(localStorageToken);
  }, []);

  const context = useMemo(() => ({
    token,
    setToken,
    user,
    setUser,
  }));

  return (
    <MainContext.Provider value={context}>{children}</MainContext.Provider>
  );
}

MainProvider.propTypes = {
  children: Proptypes.node.isRequired,
};

export default MainProvider;
