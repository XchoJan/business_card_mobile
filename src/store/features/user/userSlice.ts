import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserProfile {
  id?: string | number;
  email?: string;
  name?: string;
  last_name?: string;
  first_name?: string;
  phone?: string;
  role?: string;
  [key: string]: any;
}

interface UserState {
  profile: UserProfile | null;
}

const initialState: UserState = {
  profile: null,
};

export const getUserDisplayName = (user: UserProfile | null | undefined): string => {
  if (!user) return '';

  const first = user.first_name ?? user.name ?? '';
  const last = user.last_name ?? '';

  if (first && last) return `${first} ${last}`.trim();
  if (first) return String(first).trim();
  if (user.email) return user.email;
  return '';
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserProfile | null>) => {
      state.profile = action.payload;
    },
    clearUser: state => {
      state.profile = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
