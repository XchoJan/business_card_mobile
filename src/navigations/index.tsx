import { NavigationContainer } from '@react-navigation/native';
import UnauthorizedNavigations from './UnauthorizedNavigations/Unauthorized-navigations';

import React from 'react';
import AuthorizedNavigations from './AuthorizedNavigations/AuthorizedNavigations.tsx';
import { useSelector } from 'react-redux';

const RootNavigations = () => {
  const token = useSelector((store: any) => store.token.token);
  return (
    <NavigationContainer>
      {!token ? <UnauthorizedNavigations /> : <AuthorizedNavigations />}
    </NavigationContainer>
  );
};

export default RootNavigations;
