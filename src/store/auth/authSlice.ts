import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface IUser {
  id: string;
  name: string;
  email: string;
  part: string;
  accessToken: string;
}

type TAuthState = {
  user: {
    id: string;
    name: string;
    email: string;
    part: string;
    accessToken: string;
  };
};

const initialState: TAuthState = {
  user: {
    id: '',
    name: '',
    email: '',
    part: 'BE',
    accessToken: '',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<IUser>) => {
      state.user.id = action.payload.id;
      state.user.name = action.payload.name;
      state.user.email = action.payload.email;
      state.user.part = action.payload.part;
      state.user.accessToken = action.payload.accessToken;
    },
  },
});

export const { setUserData } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
