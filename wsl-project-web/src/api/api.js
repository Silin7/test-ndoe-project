import axios from 'axios'
import baseConfig from './baseConfig'
axios.defaults.baseURL = baseConfig.baseURL;

import api_login from './components/loginMoudle'
import api_register from './components/registerMoudle'

let api = Object.assign({}, api_login, api_register)

export default api