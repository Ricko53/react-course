/* global window */
/* global document */
/* global location */
// import { routerRedux } from 'dva/router'
import queryString from 'query-string'

export default {
  namespace: 'app',
  state: {
    userInfo: window.USER_INFO || {},
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

    // * changeNavbar (action, { put, select }) {
    //   const { app } = yield (select(_ => _))
    //   const isNavbar = document.body.clientWidth < 769
    //   if (isNavbar !== app.isNavbar) {
    //     yield put({ type: 'handleNavbar', payload: isNavbar })
    //   }
    // },

  },
  reducers: {
    // updateState (state, { payload }) {
    //   return {
    //     ...state,
    //     ...payload,
    //   }
    // },

  },
}
