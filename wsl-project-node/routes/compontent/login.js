const register = (req, res, next) => {
  res.end('hello get')
}
const register2 = (req, res, next) => {
  res.end('hello post')
}

module.exports = {
  register, register2
}