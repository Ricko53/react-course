import React from 'react'
import { Route, Router } from 'react-router-dom'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import ReactChildrenMap from '../containers/Commons/ReactChildrenMap'
import createHistory from 'history/createBrowserHistory'
const history = createHistory()

import '../style/main.less'
import '../style/style.less'
import '../assets/css/material-kit.css'

import LoginPage from '../containers/LoginPage'

export default class App extends React.Component {

    componentDidMount() {
    }
    
  render() {
      return (
          <Router history={history}>
              <Route render={({ location }) => {
                  return(
                      <CSSTransitionGroup
                          transitionName='page'
                          transitionEnter={false}
                          transitionLeave={false}
                          transitionEnterTimeout={400}
                          transitionLeaveTimeout={400}
                      >
                          <ReactChildrenMap key={location.pathname}>
                              <Route location={location} exact path="/" component={LoginPage} />
                          </ReactChildrenMap>
                      </CSSTransitionGroup>
                  )
              }}/>
          </Router>
    );
  }
}