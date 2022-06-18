import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import API from '../../lib/api/API';
import { RootState, AppThunk } from '../app/store';

interface IUserData {
  userEmail: string;
  userName: string;
  userPassword: string;
  userPart: string;
}

export type TAuthState = {
  isValidUser: boolean;
  userData: IUserData;
};

const initialState: TAuthState = {
  isValidUser: false,
  userData: {
    userEmail: '',
    userName: '',
    userPassword: '',
    userPart: '',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register: (state, action: PayloadAction<IUserData>) => {
      state.userData.userEmail = action.payload.userEmail;
      state.userData.userName = action.payload.userName;
      state.userData.userPassword = action.payload.userPassword;
      state.userData.userPart = action.payload.userPart;
    },
  },
});

export const { register } = authSlice.actions;

export const selectUserData = (state: RootState) => state.auth.userData;

export default authSlice.reducer;
