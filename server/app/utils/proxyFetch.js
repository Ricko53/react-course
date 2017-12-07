const fetch = require('node-fetch')

module.exports = async function(...args) {
  let res = await fetch(...args)
  return await res.json()
}