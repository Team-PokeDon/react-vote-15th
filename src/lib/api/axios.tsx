import axios from 'axios';

export default axios.create({
  baseURL: 'https://3ebb92ce-e5ba-4a57-9798-d1290e7ce95b.mock.pstmn.io/api',
});

// const access_token = JSON.stringify(localStorage.getItem('access_token'));
// API.defaults.headers.common['Authorization'] = access_token;

// export default API;
