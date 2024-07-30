import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Ensure you set this in your environment variables
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
