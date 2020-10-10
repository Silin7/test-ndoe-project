// 判断登录状态
getLogonStatus: {
  if (sessionStorage.getItem("logonStatus") !== '1') {
    this.$router.push({ name: 'home' })
  }
}
