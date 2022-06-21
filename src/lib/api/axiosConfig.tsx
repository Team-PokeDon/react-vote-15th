import axios from 'axios';

const API = axios.create({
  baseURL: 'https://bankids.click/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 2500,
});

const privateAPI = axios.create({
  baseURL: 'https://bankids.click/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 2500,
});

// const token = JSON.stringify(localStorage.getItem('token'));
const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU1ODMxNzMzLCJpYXQiOjE2NTU4MjgxMzMsImp0aSI6IjUwN2EzN2U0OTIzNTRlNGZiNTdhZDZlMzczNDEzZTg5IiwidXNlcl9pZCI6MjJ9.vqtLa0TCYK0ledvy4ouoUVdCM7Yt7OhmD60rJWOPkL8';
privateAPI.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default API;
