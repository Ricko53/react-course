import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import classnames from 'classnames'

import MessageManage from '../MessageManage'
import CourseManage from '../CourseManage'

import './index.less'

export default class Dashboard extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
      }
  }

  componentWillMount() {
  }

  render() {

    let { match, location } = this.props

    console.log(match, this.props)

    return(
      <article className="dashboard">
        <div className="sidebar">
          <div className="logo">
            <a className="simple-text">Corzy Coach</a>
          </div>
          <div className="sidebar-wrapper">
            <ul className="nav">
              <li className={classnames({"active": location.pathname === "/dashboard"})}>
                <Link to="/dashboard">
                  <i className="fa fa-tachometer"></i>
                  <p>数据中心</p>
                </Link>
              </li>
              <li className={classnames({"active": location.pathname === "/dashboard/course"})}>
                <Link to="/dashboard/course">
                  <i className="fa fa-clock-o"></i>
                  <p>课程管理</p>
                </Link>
              </li>
              <li className={classnames({"active": location.pathname === "/dashboard/coach"})}>
                <Link to="/dashboard/coach">
                  <i className="fa fa-user"></i>
                  <p>教练管理</p>
                </Link>
              </li>
              <li className={classnames({"active": location.pathname === "/dashboard/user"})}>
                <Link to="/dashboard/user">
                  <i className="fa fa-users"></i>
                  <p>用户管理</p>
                </Link>
              </li>
            </ul>
          </div>
          <div className="sidebar-background"></div>
        </div>
        <div className="main-panel">
          <nav className="navbar"></nav>
          <Switch>
            <Route path={`${match.path}`} exact component={MessageManage} />
            <Route path={`${match.path}/course`} component={CourseManage} />
          </Switch>
        </div>
      </article>
    )
  }
}