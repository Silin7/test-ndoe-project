import axios from 'axios'

let login = {
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
  // get_register: function (params, cb) {
  //   axios.get('/login/get_register?name=' + params.name + '&password=' + params.password).then((res) => {
  //     cb(res)
  //   }).catch((error) => {
  //     return Promise.reject(error)
  //   })
  // },
  // post_register: function (params, cb) {
  //   axios.post('/login/post_register', params).then((res) => {
  //     cb(res)
  //   }).catch((error) => {
  //     return Promise.reject(error)
  //   })
  // }
}

export default login
