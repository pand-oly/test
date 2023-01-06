import { useState, useMemo } from 'react';
import Proptypes from 'prop-types';
import MainContext from './MainContext';

function MainProvider({ children }) {
  const [token, setToken] = useState('');
  const [user, setUser] = useState({ username: '', accountId: null });

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
