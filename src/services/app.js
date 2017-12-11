import Fetch from 'utils/fetch'
// import Fetch from 'dva/fetch'
import Config from 'config'

export function getCourseDetail (cid) {
  return Fetch(Config.COURSE_DETAIL + `?id=${cid}`)
}