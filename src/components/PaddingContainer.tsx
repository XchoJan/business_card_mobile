import React from 'react';
import { View } from 'react-native';

const PaddingContainer = ({children}: any) => {
  return (
    <View style={{paddingHorizontal: 16, flex: 1}}>
      {children}
    </View>
  );
};

export default PaddingContainer;
