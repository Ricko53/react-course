import Fetch from 'utils/fetch'
// import Fetch from 'dva/fetch'
import Config from 'config'
import Utils from 'utils/utils'

export function getCourseDetail (cid) {
  return Fetch(Config.COURSE_DETAIL + `?id=${cid}`)
}

export function cancelCourse (cid) {
  let uid = Utils.getCookie('uid')
  return Fetch(Config.COURSE_JOIN + `?course_id=${cid}&gym_user_id=${uid}&status=0`)
}

export function fetchUserInfo () {
  let uid = Utils.getCookie('uid')
  return Fetch(Config.USER_INFO + `?id=${uid}`)
}