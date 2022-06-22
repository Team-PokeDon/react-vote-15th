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
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU1ODcwMTgxLCJpYXQiOjE2NTU4NjY1ODEsImp0aSI6IjE4YTRlNGZmZTg4ZTQ0ZjY5Mzg3NjMzZDBhYjg4N2E2IiwidXNlcl9pZCI6MjJ9.W0JkEHrIN8XZqBO2vWFKQudZdhVGQkkO5ok11pU7LPE';
privateAPI.defaults.headers.common['Authorization'] = `Bearer ${token}`;
