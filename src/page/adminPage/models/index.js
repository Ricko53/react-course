/* global window */
/* global document */
/* global location */
// import { routerRedux } from 'dva/router'
import queryString from 'query-string'
// import * as api from '../services'

export default {
  namespace: 'app',
  state: {
    userInfo: window.USER_INFO || {},
    courselist: [],
    coachList: [],
    userlist: [],
  },
  subscriptions: {

  },
  effects: {

  },
  reducers: {

  },
}