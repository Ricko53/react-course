import React from 'react'
import PropTypes from 'prop-types'
import { Route, routerRedux } from 'dva/router'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import ReactChildrenMap from '../containers/Commons/ReactChildrenMap'

import '../style/main.less'
import '../style/style.less'

import UserInfo from '../containers/UserInfo'
import CourseList from '../containers/CourseList'
import UserDestine from '../containers/UserDestine'
import CourseDetail from '../containers/CourseDetail'
import CoachPage from '../containers/CoachPage'

const { ConnectedRouter } = routerRedux

const Routers = ({history, app}) => {

  let state = app._store.getState()

  return (
    <ConnectedRouter history={history}>
      <Route render={({ location }) => {
          return(
              <CSSTransitionGroup
                  transitionName={state.app.pageTransitionName}
                  transitionEnter={true}
                  transitionLeave={true}
                  transitionEnterTimeout={400}
                  transitionLeaveTimeout={400}
              >
                  <ReactChildrenMap key={location.pathname}>
                      <Route exact path="/user" component={UserInfo} />
                      <Route exact path="/user/courseList" component={CourseList} />
                      <Route exact path="/user/courseList/:cid" component={CourseDetail} />
                      <Route exact path="/user/destine" component={UserDestine} />
                      <Route exact path="/coach" component={CoachPage} />
                  </ReactChildrenMap>
              </CSSTransitionGroup>
          )
      }}/>
    </ConnectedRouter>
  )
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers