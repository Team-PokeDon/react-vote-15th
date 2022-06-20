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
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU1Nzk5OTk0LCJpYXQiOjE2NTU3MTM1OTQsImp0aSI6IjliYjA2YTVkMWNkYjRjNzdiZjM0OTRmYjQyZjY3ZDY2IiwidXNlcl9pZCI6OX0.slkHJmPXW2CQyQFpdhhilExtxXXDmubAfwpwAC-Vdc4';
API.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default API;
