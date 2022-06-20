import axios from 'axios';

const API = axios.create({
  baseURL: 'https://bankids.click/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 2500,
});

// const token = JSON.stringify(localStorage.getItem('token'));
const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU1NzUwNDQ1LCJpYXQiOjE2NTU3NDY4NDUsImp0aSI6IjlkNDQ1MTUyNTU4ZTRhMjM4YjM1NWMzNWZkNzgxZjdiIiwidXNlcl9pZCI6MX0.S9eHe3cyhjMqXNU9SCYjMteLv41jmA6mJoqiYsDTDtc';
API.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default API;
