import axios from 'axios';
const BASE_URL =
  // 'https://3ebb92ce-e5ba-4a57-9798-d1290e7ce95b.mock.pstmn.io/api';
  'https://bankids.click/api';

export default axios.create({
  baseURL: BASE_URL,
});

// attach JWT token
// even first time에 실패하면 재시도
// interceptor는 만료된 토큰으로 인해 초기 요청이 거부된 경우 토큰을 refresh한다.
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  // withCredentials: true,
});

// const access_token = JSON.stringify(localStorage.getItem('access_token'));
// API.defaults.headers.common['Authorization'] = access_token;

// export default API;
