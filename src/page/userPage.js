import React from 'react'
import { Route, Router } from 'react-router-dom'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import ReactChildrenMap from '../containers/Commons/ReactChildrenMap'
import createHistory from 'history/createBrowserHistory'
const history = createHistory()


import '../style/main.less'
import '../style/style.less'

import UserInfo from '../containers/UserInfo'
import CourseList from '../containers/CourseList'
import UserDestine from '../containers/UserDestine'

export default class App extends React.Component {

    componentDidMount() {
        // window.addEventListener('hashchange', () => {
        // })
    }
    
  render() {
      return (
          <Router history={history}>
              <Route render={({ location }) => {
                  return(
                      <CSSTransitionGroup
                          transitionName={'normal'}
                          transitionEnter={true}
                          transitionLeave={true}
                          transitionEnterTimeout={400}
                          transitionLeaveTimeout={400}
                      >
                          <ReactChildrenMap key={location.pathname}>
                              <Route location={location} exact path="/" component={UserInfo} />
                              <Route location={location} exact path="/courseList" component={CourseList} />
                              <Route location={location} exact path="/destine" component={UserDestine} />
                          </ReactChildrenMap>
                      </CSSTransitionGroup>
                  )
              }}/>
          </Router>
    );
  }
}