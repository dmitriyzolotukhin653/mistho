import axios from 'axios';

const url = process.env.REACT_APP_API_BASE_URL
export const httpRequest = axios.create({
  baseURL: url,
  timeout: 20000,
  withCredentials: true
});
