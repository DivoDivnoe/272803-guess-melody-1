import axios from 'axios';

const createAPI = () => {
  const api = axios.create({
    baseURL: `https://es31-server.appspot.com/guess-melody`,
    timeout: 5000,
  });

  return api;
};

export default createAPI;
