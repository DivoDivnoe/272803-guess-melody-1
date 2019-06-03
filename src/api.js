import axios from 'axios';

const FORBIDDEN_STATUS_CODE = 403;

const createAPI = () => {
  const api = axios.create({
    baseURL: `https://es31-server.appspot.com/guess-melody`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => response;
  const onFail = (err) => {
    if (err.response.status === FORBIDDEN_STATUS_CODE) {
      history.pushState(null, null, `/login`);
    }

    return err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export default createAPI;
