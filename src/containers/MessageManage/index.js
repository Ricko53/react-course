import React from 'react'
import PropTypes from 'prop-types'

import './index.less'

export default class MessageManage extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
      }
  }

  componentWillMount() {
  }

  render() {

    return(
      <section className="message-manage">
        Message
      </section>
    )
  }
}