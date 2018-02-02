import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import ReactChildrenMap from 'commons/ReactChildrenMap'
// import createHistory from 'history/createBrowserHistory'
// const history = createHistory()

import 'style/main.less'
import 'style/style.less'
import 'assets/css/material-dashboard.css'

import Dashboard from './containers/Dashboard'
// import MessageManage from '../containers/MessageManage'
// import CourseManage from '../containers/CourseManage'
// import CoachManage from '../containers/CoachManage'
// import UserManage from '../containers/UserManage'

export default class App extends React.Component {

  componentDidMount() {
  }
    
  render() {

    // <Route path="coach" component={CoachManage}></Route>
    // <Route path="user" component={UserManage}></Route>

    return (
      <BrowserRouter>
        <Route path="/dashboard" component={Dashboard} />
      </BrowserRouter>
    )
  }
}