import React, { useState } from 'react';
import { View } from 'react-native';
import MapContainer from '../../../components/MapContainer';
import BottomSheetWrapper from '../../../components/BottomSheetWrapper';

const MapMainScreen = () => {
  const [sheetIndex, setSheetIndex] = useState(-1); // -1 = скрыт

  const handleMarkerPress = () => {
    setSheetIndex(0);
  };

  const handleSheetChange = (index: number) => {
    setSheetIndex(index);
  };


  return (
    <View style={{ flex: 1 }}>
      <MapContainer onMarkerPress={handleMarkerPress}/>

      <BottomSheetWrapper
        index={sheetIndex}
        onChange={handleSheetChange}
      />
    </View>
  );
};

export default MapMainScreen;
