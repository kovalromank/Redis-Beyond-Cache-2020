import Axios from 'axios';

const instance = Axios.create({ baseURL: process.env.REACT_APP_API_URL, responseType: 'json' });

export default instance;
