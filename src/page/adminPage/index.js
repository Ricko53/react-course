import React from 'react'
import PropTypes from 'prop-types'
import { Route, routerRedux } from 'dva/router'
// import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import ReactChildrenMap from 'commons/ReactChildrenMap'

import 'style/main.less'
import 'style/style.less'
import 'assets/css/material-dashboard.css'

import Dashboard from './containers/Dashboard'

const { ConnectedRouter } = routerRedux

const Routers = ({history, app}) => {

  return (
    <ConnectedRouter history={history}>
      <Route render={({ location }) => {
          return (
            <Route path="/dashboard" component={Dashboard} />
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