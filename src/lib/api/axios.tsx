import axios from 'axios';
import { useAppSelector } from '../../store/app/hooks';
import { selectUser } from '../../store/auth/authSlice';

const BASE_URL = 'https://bankids.click/api';
// 'https://3ebb92ce-e5ba-4a57-9798-d1290e7ce95b.mock.pstmn.io/api';

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  // withCredentials: true,
});
