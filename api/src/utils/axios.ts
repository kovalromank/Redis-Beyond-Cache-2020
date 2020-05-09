import Axios from 'axios';

const axios = {
  spotify: Axios.create({ baseURL: 'https://api.spotify.com/v1' }),
};

export default axios;
