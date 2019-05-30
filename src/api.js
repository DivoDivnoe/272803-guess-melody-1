import axios from 'axios';

const api = axios.create({
  baseURL: `https://es31-server.appspot.com/guess-melody`,
  timeout: 5000,
});

export default api;
