import axios from 'axios';

const API = axios.create({
  baseURL: 'https://3ebb92ce-e5ba-4a57-9798-d1290e7ce95b.mock.pstmn.io/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 2500,
});

const token = JSON.stringify(localStorage.getItem('token'));
API.defaults.headers.common['Authorization'] = token;

export default API;
