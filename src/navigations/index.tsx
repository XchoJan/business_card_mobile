import { NavigationContainer } from '@react-navigation/native';
import UnauthorizedNavigations from './UnauthorizedNavigations/Unauthorized-navigations';

import React, { useEffect } from 'react';
import AuthorizedNavigations from './AuthorizedNavigations/AuthorizedNavigations.tsx';
import { useDispatch, useSelector } from 'react-redux';
import Api from '../Api';
import { TokensRepository } from '../helpers/tokens-repository.ts';
import { setToken } from '../store/features/token/tokenSlice.ts';
import { setUser } from '../store/features/user/userSlice.ts';

const RootNavigations = () => {
  const dispatch = useDispatch();
  const token = useSelector((store: any) => store.token.token);



  const tokenRepoToken = TokensRepository.getAccessToken();

  useEffect(() => {
    if (!token && tokenRepoToken) {
      dispatch(setToken(tokenRepoToken));
    }
  }, [dispatch, token, tokenRepoToken]);

  const getUserData = async () => {
    if (!token) return;
    try {
      const response = await Api.getUserData();
      const user =
        response?.data?.data?.user ??
        response?.data?.data ??
        response?.data?.user ??
        response?.data;
      dispatch(setUser(user ?? null));
    } catch (e: any) {
      console.log(e?.response?.data ?? e?.message ?? e, 'Error From get user');
    }
  };

  useEffect(() => {
    getUserData().then();
  }, [token]);

  return (
    <NavigationContainer>
      {!token ? <UnauthorizedNavigations /> : <AuthorizedNavigations />}
    </NavigationContainer>
  );
};

export default RootNavigations;
