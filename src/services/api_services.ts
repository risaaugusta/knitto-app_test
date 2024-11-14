import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://pixabay.com/api/',  
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
