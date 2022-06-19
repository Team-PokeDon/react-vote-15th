import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import API from '../../lib/api/API';
import { RootState, AppThunk } from '../app/store';

interface IUser {
  email: string;
  id: string;
  name: string;
  part: string;
  token: string;
}

export type TAuthState = {
  user: IUser;
};

const initialState: TAuthState = {
  user: {
    email: '',
    id: '',
    name: '',
    part: '',
    token: '',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUser>) => {
      state.user.email = action.payload.email;
      state.user.id = action.payload.id;
      state.user.name = action.payload.name;
      state.user.part = action.payload.part;
      state.user.token = action.payload.token;
    },
  },
});

export const { login } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
