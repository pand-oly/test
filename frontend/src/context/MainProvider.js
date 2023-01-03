import { useState, useMemo } from 'react';
import Proptypes from 'prop-types';
import MainContext from './MainContext';

function MainProvider({ children }) {
  const [token, setToken] = useState('');

  const context = useMemo(() => ({
    token,
    setToken,
  }));

  return (
    <MainContext.Provider value={context}>{children}</MainContext.Provider>
  );
}

MainProvider.propTypes = {
  children: Proptypes.node.isRequired,
};

export default MainProvider;
