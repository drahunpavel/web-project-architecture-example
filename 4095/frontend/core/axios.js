import axios from 'axios';
const host = window.location.href;

// axios.defaults.baseURL = 'http://localhost:4096/';
axios.defaults.baseURL = host;

export default axios;