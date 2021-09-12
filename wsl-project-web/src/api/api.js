import axios from 'axios'
import baseConfig from './baseConfig'

axios.defaults.baseURL = baseConfig.baseURL;

let api = {
  // 登录
  signIn: function (params, cb) {
    axios.post('/login/sign/in', params).then((res) => {
      cb(res)
    }).catch((error) => {
      return Promise.reject(error)
    })
  },
  // 修改密码
  changePassword: function (params, cb) {
    axios.post('/login/change/password', params).then((res) => {
      cb(res)
    }).catch((error) => {
      return Promise.reject(error)
    })
  },
  // ------------------------ 班级 ------------------------
  // 班级新增
  classAdd: function (params, cb) {
    axios.post('/class/add', params).then((res) => {
      cb(res)
    }).catch((error) => {
      return Promise.reject(error)
    })
  },
  // 班级列表列表
  classList: function (params, cb) {
    axios.get('/class/list?page=' + params.page + '&limit=' + params.limit).then((res) => {
      cb(res)
    }).catch((error) => {
      return Promise.reject(error)
    })
  },
  // 删除班级
  classCancel: function (id, cb) {
    axios.get('/class/cancel?id=' + id).then((res) => {
      cb(res)
    }).catch((error) => {
      return Promise.reject(error)
    })
  },
  // ------------------------ 学生 ------------------------
  // 学生列表
  stlistList: function (params, cb) {
    axios.get('/stlist/list?page=' + params.page + '&limit=' + params.limit + '&cid=' + params.cid).then((res) => {
      cb(res)
    }).catch((error) => {
      return Promise.reject(error)
    })
  },
  // 学生新增
  stlistAdd: function (params, cb) {
    axios.post('/stlist/add', params).then((res) => {
      cb(res)
    }).catch((error) => {
      return Promise.reject(error)
    })
  },
  // 修改学生
  stlistModify: function (params, cb) {
    axios.post('/stlist/modify', params).then((res) => {
      cb(res)
    }).catch((error) => {
      return Promise.reject(error)
    })
  },
  // 删除学生
  stlistCancel: function (id, cb) {
    axios.get('/stlist/cancel?id=' + id).then((res) => {
      cb(res)
    }).catch((error) => {
      return Promise.reject(error)
    })
  }
}

export default api