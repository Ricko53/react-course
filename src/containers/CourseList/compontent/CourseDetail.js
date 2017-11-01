import React from 'react'
import PropTypes from 'prop-types'

import './courseDetail.less'

export default class FakeModel extends React.Component {

    constructor(props) {
      super(props)
    }

    componentWillMount() {

    }

    render() {

      let { showDetail, info } = this.props

      let bgStyle = {
        backgroundImage: info.coverImage,
      }

      return(
        <section className={showDetail ? 'detail-layer show-Detail' : 'detail-layer'}>
          <section className="detail-header" style={bgStyle}>
            <div className="header-content">
              <h1 className="detail-title">邹市明拳击燃脂</h1>
              <p className="detail-date">
                <i className="icon-clock"></i> 时间：9:00 - 11:30
              </p>
            </div>
          </section>
          <section className="detail-content">
            <section className="detail-box">
              <div className="box-section">
                <div className="coach-box">
                  <img className="coach-thumb" src="http://static1.keepcdn.com/avatar/2017/10/26/17/644c740dac007c38a3134f84950a4ba3fc035ceb.jpg?imageMogr2/thumbnail/96x" />
                  <div className="coach-base">
                    <div className="coach-name">邹市明</div>
                    <div className="coach-level">资深健身教练</div>
                  </div>
                </div>
                <div></div>
              </div>
              <div className="box-section">
                <div className="box-left">
                  <div className="box-follows-list">
                    <img className="follows-item" src="http://static1.keepcdn.com/avatar/2017/10/26/17/644c740dac007c38a3134f84950a4ba3fc035ceb.jpg?imageMogr2/thumbnail/96x" />
                    <img className="follows-item" src="http://static1.keepcdn.com/avatar/2017/10/03/14/9fe9847048da659bf645749e75b49c840f348be9.jpg?imageMogr2/thumbnail/96x" />
                    <img className="follows-item" src="http://static1.keepcdn.com/avatar/2017/10/26/13/0545ac7e18565ede040232294cfc6efdc053db0a.jpg?imageMogr2/thumbnail/96x" />
                    <img className="follows-item" src="http://static1.keepcdn.com/avatar/2016/11/29/08/a659895c477be622a4855b4d26c577b50409c3dd.jpg?imageMogr2/thumbnail/96x" />
                  </div>
                  <p className="box-name">已有 4 人参加课程</p>
                </div>
                <div className="box-right">
                  <div className="box-button">
                    <i className="icon-price-tag"></i>
                  </div>
                </div>
              </div>
            </section>
            <section className="detail-introduction">
              <h2 className="int-title">活动简介</h2>
              <div className="int-content">拳击，燃脂效率最高的运动之一。<br/>拳击，既是体育运动，也是一种燃脂效率极高的健身方式。拳击动作讲究力量的传导，每一次出拳都是蹬地、转胯、送肩发力，其实它是一项全身性的综合运动。正因如此，拳击训练才会有如此大的消耗</div>
              <div className="int-button">参加课程</div>
              <div className="int-bottom">如果有任何问题或疑问,<br/>请拨打课程咨询热线4008818856</div>
            </section>
          </section>
        </section>
      )
    }
}

FakeModel.propTypes = {
  showDetail: PropTypes.bool,
  info: PropTypes.object,
}