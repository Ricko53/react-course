/* global window */
/* global document */
/* global location */
// import { routerRedux } from 'dva/router'
import queryString from 'query-string'
import * as api from '../services/app'

export default {
  namespace: 'app',
  state: {
    userInfo: window.USER_INFO || {},
    showDetail: false,
    courseDetail: {},
    pageTransitionName: 'left',
    locationPathname: '',
    locationQuery: {},
  },
  subscriptions: {

    setupHistory ({ dispatch, history }) {
      history.listen((location) => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: queryString.parse(location.search),
          },
        })
      })
    },

  },
  effects: {

    * getCourseDetail ({payload}, { call, put }) {
      const currentCourse = yield call(api.getCourseDetail, payload)
      // const currentCourse = yield api.getCourseDetail(payload)

      yield put({ type: 'updateCourseDetail', payload: currentCourse.course })
      // yield put({ type: 'changeShowDetail' })
    }

  },
  reducers: {
    updateCourseDetail(state, {payload}) {
      return {
        ...state,
        courseDetail: payload,
      }
    },

    changeShowDetail(state) {
      return {
        ...state,
        showDetail: !state.showDetail,
      }
    },

    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

  },
}
