import axios from 'axios';

export const httpClient = axios.create({
  baseURL: `http://localhost:${process.env.BACKEND_PORT}`,
});
