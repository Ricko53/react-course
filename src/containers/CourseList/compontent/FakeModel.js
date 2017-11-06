import React from 'react'
import PropTypes from 'prop-types'
import { Motion, spring } from 'react-motion'
import classnames from 'classnames'

import './fakeModel.less'

const springConfig = {stiffness: 800, damping: 50}
const detailPageCover = {h: 250, w: window.innerWidth}
const detailPageInfo = {h: 200, w: window.innerWidth - 40, top: 150, left: 20 }

export default class FakeModel extends React.Component {

    constructor(props) {
      super(props)
    }

    componentWillMount() {

    }

    render() {

      let { show, info, close } = this.props

      if(show) {

        let coverStyle = {
          top: info.coverClient.y,
          left: info.coverClient.x,
          height: info.coverClient.height,
          width: info.coverClient.width,
        }

        let infoStyle = {
          top: info.infoClient.y,
          left: info.infoClient.x,
          height: info.infoClient.height,
          width: info.infoClient.width,
        }

        let coverSpring = close ? {
          top: spring(info.coverClient.y, springConfig),
          left: spring(info.coverClient.x, springConfig),
          height: spring(info.coverClient.height, springConfig),
          width: spring(info.coverClient.width, springConfig),
        } : {
          top: spring(0, springConfig),
          left: spring(0, springConfig),
          height: spring(detailPageCover.h, springConfig),
          width: spring(detailPageCover.w, springConfig),
        }

        let infoSpring = close ? {
          top: spring(info.infoClient.y, springConfig),
          left: spring(info.infoClient.x, springConfig),
          height: spring(info.infoClient.height, springConfig),
          width: spring(info.infoClient.width, springConfig),
        } : {
          top: spring(detailPageInfo.top, springConfig),
          left: spring(detailPageInfo.left, springConfig),
          height: spring(detailPageInfo.h, springConfig),
          width: spring(detailPageInfo.w, springConfig),
        }

        return(
          <section className={classnames('fake-layer', {'close-transition': close})}>
            <Motion defaultStyle={coverStyle}  style={coverSpring}>
              {
                ({top, left, height, width}) => <div className="fake-cover" style={{
                  top,
                  left,
                  height,
                  width,
                  backgroundImage: info.coverImage,
                }}></div>
              }
            </Motion>
            <Motion defaultStyle={infoStyle}  style={infoSpring}>
              {
                ({top, left, height, width}) => <div className="fake-info" style={{
                  top,
                  left,
                  height,
                  width
                }}></div>
              }
            </Motion>
          </section>
        )
      } else {
        return(
          <section></section>
        )
      }
    }
}

FakeModel.propTypes = {
  show: PropTypes.bool,
  info: PropTypes.object,
}