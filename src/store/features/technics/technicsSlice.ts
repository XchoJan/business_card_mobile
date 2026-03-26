import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Technic {
  id: string;
  carNumber: string;
  model?: string;
  brand?: string;
  year?: string;
  vin?: string;
  [key: string]: any;
}

export interface Driver {
  id: string;
  phoneNumber: string;
  password: string;
  name?: string;
  [key: string]: any;
}

interface TechnicsState {
  technics: Technic[];
  drivers: Driver[];
}

const initialState: TechnicsState = {
  technics: [],
  drivers: [],
};

const technicsSlice = createSlice({
  name: 'technics',
  initialState,
  reducers: {
    addTechnic: (state, action: PayloadAction<Technic>) => {
      state.technics.push(action.payload);
    },
    updateTechnic: (state, action: PayloadAction<Technic>) => {
      const index = state.technics.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.technics[index] = action.payload;
      }
    },
    deleteTechnic: (state, action: PayloadAction<string>) => {
      state.technics = state.technics.filter(t => t.id !== action.payload);
    },
    addDriver: (state, action: PayloadAction<Driver>) => {
      state.drivers.push(action.payload);
    },
    updateDriver: (state, action: PayloadAction<Driver>) => {
      const index = state.drivers.findIndex(d => d.id === action.payload.id);
      if (index !== -1) {
        state.drivers[index] = action.payload;
      }
    },
    deleteDriver: (state, action: PayloadAction<string>) => {
      state.drivers = state.drivers.filter(d => d.id !== action.payload);
    },
  },
});

export const {
  addTechnic,
  updateTechnic,
  deleteTechnic,
  addDriver,
  updateDriver,
  deleteDriver,
} = technicsSlice.actions;

export default technicsSlice.reducer;

