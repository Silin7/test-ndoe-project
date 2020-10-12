import axios from 'axios'

let register = {
  // get_register: function (params, cb) {
  //   axios.get('/register/get_register?name=' + params.name + '&password=' + params.password).then((res) => {
  //     cb(res)
  //   }).catch((error) => {
  //     return Promise.reject(error)
  //   })
  // },
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
  }
}

export default register
