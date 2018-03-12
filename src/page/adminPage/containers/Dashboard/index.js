import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import classnames from 'classnames'
import { connect } from 'dva'

import MessageManage from '../MessageManage'
import CourseManage from '../CourseManage'
import CoachManage from '../CoachManage'
import UserManage from '../UserManage'

import './index.less'
 
class Dashboard extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
      }
  }

  componentWillMount() {
  }

  render() {

    let { match, location } = this.props

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
          <nav className="navbar navbar-transparent">
            <div className="navbar-header">
              <a className="navbar-brand"> 数据中心 </a>
            </div>
            <div className="collapse navbar-collapse">
            </div>
          </nav>
          <div className="content">
            <div className="main-container">
              <Switch>
                <Route path={`${match.path}`} exact component={MessageManage} />
                <Route path={`${match.path}/course`} component={CourseManage} />
                <Route path={`${match.path}/coach`} component={CoachManage} />
                <Route path={`${match.path}/user`} component={UserManage} />
              </Switch>
            </div>
          </div>
          <footer className="footer"></footer>
        </div>
      </article>
    )
  }
}

export default connect(app => app)(Dashboard)