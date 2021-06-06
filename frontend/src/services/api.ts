import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_HOST,
});

export default api;
