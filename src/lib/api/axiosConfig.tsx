import axios from 'axios';

const API = axios.create({
  baseURL: 'http://bankids.click/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 2500,
});

const token = JSON.stringify(localStorage.getItem('token'));
API.defaults.headers.common['Authorization'] = token;

export default API;
