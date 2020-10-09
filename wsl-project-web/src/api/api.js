import axios from 'axios'
import baseConfig from './baseConfig'
axios.defaults.baseURL = baseConfig.baseURL;
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.post['Access-Control-Allow-Origine'] = '*';

import api_login from './components/login'

let api = Object.assign({}, api_login)

export default api