import axios from 'axios';

export const axiosWithAuth = () => {
  const token = localStorage.getItem('id_token');
  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`
    },
    baseURL: process.env.REACT_APP_BASE_URL,
    // Fail instead of hanging forever if the API never responds.
    timeout: 20000
  });
};