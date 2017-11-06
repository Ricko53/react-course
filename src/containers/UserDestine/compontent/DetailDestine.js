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
      this.updateDetail = this.updateDetail.bind(this)

      this.state = {
        close: false,
        courseData: {},
      }
    }

    componentWillMount() {

    }

    // shouldComponentUpdate(nextProps, nextState) {
    //   return true
    // }

    componentWillReceiveProps(nextProps) {
      if(nextProps.show) {
        this.updateDetail()
      }
    }

    updateDetail() {
      // setTimeout 是为了模拟 http 请求
      setTimeout(() => {
        this.setState({
          courseData: {
            course_id: '21',
            course_name: '有氧操 · 活力燃脂',
            course_date: '星期二 9：00 - 11：30',
            course_desc: '拳击，燃脂效率最高的运动之一。<br/>拳击，既是体育运动，也是一种燃脂效率极高的健身方式。拳击动作讲究力量的传导，每一次出拳都是蹬地、转胯、送肩发力，其实它是一项全身性的综合运动。正因如此，拳击训练才会有如此大的消耗',
            course_coach: {
              name: 'Humble',
              desc: 'Kendrick Lamar on DAMN.',
              thumb: 'http://static1.keepcdn.com/avatar/2017/10/26/17/644c740dac007c38a3134f84950a4ba3fc035ceb.jpg?imageMogr2/thumbnail/96x'
            }
          }
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
        courseData: {},
      })
    }

    render() {

      let { show, info } = this.props
      let { close, courseData } = this.state

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
            <div className={classnames("detail-contnet", {"show-content": courseData.course_name})} style={{top: detailPageCover.top + detailPageCover.h}}>
              <div className="dt-title">{courseData.course_name}</div>
              <div className="dt-date"><i className="icon-clock"></i>{courseData.course_date}</div>
              <p className="dt-desc">{courseData.course_desc}</p>
              <div className="dt-button">取消预约</div>
            </div>
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