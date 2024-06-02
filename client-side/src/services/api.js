// services/api.js
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' }); // Update the baseURL if needed

API.interceptors.request.use((req) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (userInfo) {
    req.headers.Authorization = `Bearer ${userInfo.token}`;
  }
  return req;
});

export default API;