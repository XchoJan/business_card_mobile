import React from 'react';
import { useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/core';
import { setTabBarVisible } from '../store/features/booleans/tabBarVisible.ts';
import { View } from 'react-native';

const HideTabBar = () => {
 const dispatch = useDispatch();

  useFocusEffect(()=> {
    dispatch(setTabBarVisible(false))
    return ()=> {
      dispatch(setTabBarVisible(true))
    }
  })

  return(
    <View style={{width:0, height:0}}/>
  )
};

export default HideTabBar;
