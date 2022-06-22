import axios from 'axios';

export const API = axios.create({
  baseURL: 'https://bankids.click/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 2500,
});

export const privateAPI = axios.create({
  baseURL: 'https://bankids.click/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 2500,
});

// const token = JSON.stringify(localStorage.getItem('token'));
const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU1ODg2Njk5LCJpYXQiOjE2NTU4ODMwOTksImp0aSI6IjhiMThjNWIxYTFiMjRhNjJhMzIzODUxMTdhMDkzZTQ1IiwidXNlcl9pZCI6MjJ9.NPkc2-819T7sdsqeBIH6eML13pE_rly7FcOirQb1Zm8';
privateAPI.defaults.headers.common['Authorization'] = `Bearer ${token}`;
