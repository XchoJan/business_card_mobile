import {createSlice} from '@reduxjs/toolkit';

export const tokenState = {
  token: '',
};

const tokenSlice = createSlice({
  name: 'token',
  initialState: tokenState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const {setToken} = tokenSlice.actions;
export default tokenSlice.reducer;
