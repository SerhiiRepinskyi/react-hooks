import axios from 'axios';

const API_KEY = 'zxP7C9v5nwU68dNu5YHGd9txiDuwhGQKChriag7rzY7p7CuzUE8nFDpU';
axios.defaults.baseURL = 'https://api.pexels.com/v1/';
axios.defaults.headers.common['Authorization'] = API_KEY;
axios.defaults.params = {
  orientation: 'landscape',
  per_page: 15,
};

export const getImages = async (query, page) => {
  return await axios.get(`search?query=${query}&page=${page}`)
};
