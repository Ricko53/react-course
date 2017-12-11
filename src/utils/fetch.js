// const fetch from 'fetch'
// import FetchApi from 'dva/fetch'

export default function(url, option = {}) {
  return new Promise( (resolve, reject) => {
    fetch(url, option).then( res => {
      return res.json()
    }).then(data => {
      if ( data.code === 200 ) {
        resolve(data.data)
      } else {
        reject(data.message)
      }
    }).catch( error => {
      console.log(error)
    })
  })
}