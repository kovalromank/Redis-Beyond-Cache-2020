import Axios from 'axios';

const instance = Axios.create({ baseURL: process.env.API_URL, responseType: 'json' });

export default instance;
