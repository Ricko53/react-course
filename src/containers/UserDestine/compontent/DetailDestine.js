import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Motion, spring } from 'react-motion'

import './detailDestine.less'

const springConfig = {stiffness: 800, damping: 50}
const detailPageCover = {h: 200, w: 280, top: 100, left: (window.innerWidth - 280)/2, }
const detailPageBox = {h: 400, w: window.innerWidth - 50, top: 150, left: 25 }

export default class FakeModel extends React.Component {

    constructor(props) {
      super(props)

      this.closeDetailPage = this.closeDetailPage.bind(this)
      this.handleMotionEnd = this.handleMotionEnd.bind(this)

      this.state = {
        close: false
      }
    }

    componentWillMount() {
    }

    handleMotionEnd() {
      if(this.state.close) {
        this.props.closeDetail()
        this.state.close = false
      }
    }

    closeDetailPage() {
      this.setState({
        close: true
      })
    }

    render() {

      let { show, info } = this.props
      let { close } = this.state

      if(show) {

        let coverStyle = {
          top: info.coverClient.y,
          left: info.coverClient.x,
          height: info.coverClient.height,
          width: info.coverClient.width,
        }

        let infoStyle = {
          top: info.boxClient.y,
          left: info.boxClient.x,
          height: info.boxClient.height,
          width: info.boxClient.width,
        }

        let coverSpring = close ? {
          top: spring(info.coverClient.y, springConfig),
          left: spring(info.coverClient.x, springConfig),
          height: spring(info.coverClient.height, springConfig),
          width: spring(info.coverClient.width, springConfig),
        } : {
          top: spring(detailPageCover.top, springConfig),
          left: spring(detailPageCover.left, springConfig),
          height: spring(detailPageCover.h, springConfig),
          width: spring(detailPageCover.w, springConfig),
        }

        let infoSpring = close ? {
          top: spring(info.boxClient.y, springConfig),
          left: spring(info.boxClient.x, springConfig),
          height: spring(info.boxClient.height, springConfig),
          width: spring(info.boxClient.width, springConfig),
        } : {
          top: spring(detailPageBox.top, springConfig),
          left: spring(detailPageBox.left, springConfig),
          height: spring(detailPageBox.h, springConfig),
          width: spring(detailPageBox.w, springConfig),
        }

        return(
          <section className={classnames('destine-detail-layer', {'close-transition': close})}>
            <Motion defaultStyle={coverStyle}  style={coverSpring}>
              {
                ({top, left, height, width}) => <div className="detail-cover" style={{
                  top,
                  left,
                  height,
                  width,
                  backgroundImage: info.coverImage,
                }}></div>
              }
            </Motion>
            <Motion defaultStyle={infoStyle}  style={infoSpring} onRest={this.handleMotionEnd}>
              {
                ({top, left, height, width}) => <div className="detail-box" style={{
                  top,
                  left,
                  height,
                  width
                }}></div>
              }
            </Motion>
            <div onClick={this.closeDetailPage} className="destine-detail-bg"></div>
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
  closeDetail: PropTypes.func,
}