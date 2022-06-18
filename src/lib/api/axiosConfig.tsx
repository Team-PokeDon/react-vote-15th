import axios from 'axios';

const API = axios.create({
  baseURL: 'http://ec2-52-78-135-107.ap-northeast-2.compute.amazonaws.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 2500,
});

const token = JSON.stringify(localStorage.getItem('token'));
API.defaults.headers.common['Authorization'] = token;

export default API;
