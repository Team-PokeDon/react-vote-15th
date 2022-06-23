import axios from 'axios';

const BASE_URL = 'https://bankids.click/api';

// axiosPrivate instance는 useAxiosPrivate hook을 통해 생성할 수 있다.
export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// imported in useAxiosPrivate
export const axiosPrivateInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
