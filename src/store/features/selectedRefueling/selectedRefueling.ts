import {createSlice} from '@reduxjs/toolkit';

export const refuelingState = {
  refueling:  {},
};

const refuelingSlice = createSlice({
  name: 'refueling',
  initialState: refuelingState,
  reducers: {
    setSelectedRefueling: (state, action) => {
      state.refueling = action.payload;
    },
  },
});

export const {setSelectedRefueling} = refuelingSlice.actions;
export default refuelingSlice.reducer;
