import axios from 'axios';
import { useAppSelector } from '../../store/app/hooks';
import { selectUser } from '../../store/auth/authSlice';

const BASE_URL = 'https://bankids.click/api';
// 'https://3ebb92ce-e5ba-4a57-9798-d1290e7ce95b.mock.pstmn.io/api';

export default axios.create({
  baseURL: BASE_URL,
});

// 요청에 JWT을 포함시킨다.
// 요청이 실패하는 경우 interceptor를 통해 토큰 재발급을 진행하고 요청을 다시 수행한다.
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  // withCredentials: true,
});
