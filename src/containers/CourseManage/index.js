import React from 'react'
import PropTypes from 'prop-types'

import './index.less'

export default class CourseManage extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
      }
  }

  componentWillMount() {
  }

  render() {

    return(
      <section className="course-manage">
        Course Manage
      </section>
    )
  }
}