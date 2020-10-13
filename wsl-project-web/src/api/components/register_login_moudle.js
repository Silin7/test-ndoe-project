import axios from 'axios'

let login = {
  post_register: function (params, cb) {
    axios.post('/register/post_register', params).then((res) => {
      cb(res)
    }).catch((error) => {
      return Promise.reject(error)
    })
  },
  post_register_inster: function (params, cb) {
    axios.post('/register/post_register_inster', params).then((res) => {
      cb(res)
    }).catch((error) => {
      return Promise.reject(error)
    })
  },
  get_loginInfo: function (cb) {
    axios.get('/login/get_loginInfo').then((res) => {
      cb(res)
    }).catch((error) => {
      return Promise.reject(error)
    })
  },
  post_login: function (params, cb) {
    axios.post('/login/post_login', params).then((res) => {
      cb(res)
    }).catch((error) => {
      return Promise.reject(error)
    })
  }
}

export default login
