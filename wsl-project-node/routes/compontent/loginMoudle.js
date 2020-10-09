const get_register = (req, res, next) => {
  console.log('GET')
  res.end('HELLO GET')
}
const post_register = (req, res, next) => {
  console.log('POST')
  res.end('HELLO POST')
}

module.exports = {
  get_register, post_register
}