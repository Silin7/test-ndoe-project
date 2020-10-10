import axios from 'axios'
import baseConfig from './baseConfig'
axios.defaults.baseURL = baseConfig.baseURL;
// axios.defaults.headers.post['Access-Control-Allow-Methods'] = '*';
// axios.defaults.headers.post['Access-Control-Allow-Headers'] = 'X-Requested-With';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.post['X-Powered-By'] = '3.2.1';
// axios.defaults.headers.post['Content-Type'] = '*';

import api_login from './components/login'

let api = Object.assign({}, api_login)

export default api