import axios from 'axios';

const BASE_URL = 'https://bankids.click/api';

// axiosPublicInstance
export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// imported in useAxiosPrivate
export const axiosPrivateInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
