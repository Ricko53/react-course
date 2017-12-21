import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Motion, spring } from 'react-motion'
import Utils from 'utils/utils'

import './index.less'

const springConfig = {stiffness: 800, damping: 50}

function springPackage(client) {
  return {
    top: spring(client.y, springConfig),
    left: spring(client.x, springConfig),
    height: spring(client.height, springConfig),
    width: spring(client.width, springConfig)
  }
}

export default class DetailLayoutTransform extends React.Component {

    constructor(props) {
      super(props)

      this.closeDetailPage = this.closeDetailPage.bind(this)
      this.handleMotionEnd = this.handleMotionEnd.bind(this)
      this.updateDetail = this.updateDetail.bind(this)

      this.state = {
        close: false,
        // 需要展示的数据
        showData: {},
      }
    }

    componentWillMount() {

    }

    // shouldComponentUpdate(nextProps, nextState) {
    //   return true
    // }

    componentWillReceiveProps(nextProps) {
      if(nextProps.show) {
        this.updateDetail(nextProps)
      }
    }

    updateDetail(nextProps) {
      // setTimeout 是为了模拟 http 请求
      setTimeout(() => {
        this.setState({
          showData: nextProps.showData
        })
      }, 300)
    }

    handleMotionEnd() {
      if(this.state.close) {
        this.props.closeDetail()
        this.state.close = false
      }
    }

    closeDetailPage() {
      this.setState({
        close: true,
        showData: {},
      })

      setTimeout(() => {
        this.handleMotionEnd()
      }, 300)
    }

    render() {

      let { show, info, initPostiton, transPosition } = this.props
      let { close, showData } = this.state

      if(show) {

        let { coverClient, contentClient } = initPostiton
        let { afterCoverClient, afterContentClient } = transPosition

        let coverStyle = {
          top: coverClient.y,
          left: coverClient.x,
          height: coverClient.height,
          width: coverClient.width,
        }

        let contentStyle = {
          top: contentClient.y,
          left: contentClient.x,
          height: contentClient.height,
          width: contentClient.width,
        }

        let coverSpring = close ? springPackage(coverClient) : springPackage(afterCoverClient)

        let contentSpring = close ? springPackage(contentClient) : springPackage(afterContentClient)

        return(
          <section className={classnames('trans-detail-layer', {'close-transition': close})}>
            <Motion defaultStyle={coverStyle}  style={coverSpring}>
              {
                ({top, left, height, width}) => <img src={info.imgUrl} className="detail-cover" style={{
                  top,
                  left,
                  height,
                  width,
                }}></img>
              }
            </Motion>
            <Motion defaultStyle={contentStyle}  style={contentSpring} onRest={()=>{}}>
              {
                ({top, left, height, width}) => <div className="detail-box" style={{
                  top,
                  left,
                  height,
                  width
                }}></div>
              }
            </Motion>
            <div className={classnames("detail-contnet", {"show-content": showData.course_name})} style={{}}>
              {this.props.children}
            </div>
            <div onClick={this.closeDetailPage} className="trans-detail-bg"></div>
          </section>
        )
      } else {
        return(
          <section></section>
        )
      }
    }
}

DetailLayoutTransform.propTypes = {
  show: PropTypes.bool,
  // 需要 Fake 对象的图片背景信息
  info: PropTypes.object,
  // 初始化位置信息
  initPostiton: PropTypes.object,
  // 变化的位置信息
  transPosition: PropTypes.object,
  // 需要展示的数据
  showData: PropTypes.object,
  // 关闭函数
  closeDetail: PropTypes.func,
}