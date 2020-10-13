import axios from 'axios'

let login = {
  // 注册：判断账号是否存在
  post_register: function (params, cb) {
    axios.post('/register/post_register', params).then((res) => {
      cb(res)
    }).catch((error) => {
      return Promise.reject(error)
    })
  },
  // 注册：将注册信息写入数据库
  post_register_inster: function (params, cb) {
    axios.post('/register/post_register_inster', params).then((res) => {
      cb(res)
    }).catch((error) => {
      return Promise.reject(error)
    })
  },
  // 登录：判断账号是否存在
  get_loginInfo: function (cb) {
    axios.get('/login/get_loginInfo').then((res) => {
      cb(res)
    }).catch((error) => {
      return Promise.reject(error)
    })
  },
  // 登录：验证账号信息，登录
  post_login: function (params, cb) {
    axios.post('/login/post_login', params).then((res) => {
      cb(res)
    }).catch((error) => {
      return Promise.reject(error)
    })
  }
}

export default login
