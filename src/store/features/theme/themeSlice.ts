import {createSlice} from '@reduxjs/toolkit';
import { MmkvRepository } from '../../../helpers/mmkv-storage.ts';

export const themeState = {
  theme: MmkvRepository.getThemeSync() || 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: themeState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const {setTheme} = themeSlice.actions;
export default themeSlice.reducer;
