import React from 'react'
import PropTypes from 'prop-types'

import './index.less'

import mokeData from './mokeUserData.js'

let winWidth = window.innerWidth
let startX = 0
let moveIndex = 0

export default class UserPage extends React.Component {

    constructor(props) {
        super(props);
        //构造函数用法
        //常用来绑定自定义函数，切记不要在这里或者组件的任何位置setState，state全部在reducer初始化，相信对开发的后期很有帮助
        //例子：this.myfunction = this.myfunction.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleTouchStart = this.handleTouchStart.bind(this)
        this.handleTouchEnd = this.handleTouchEnd.bind(this)

        this.state = {
          userInfo: {},
          moveX: 0,
        }
    }

    componentWillMount() {
      this.setState({
        userInfo: mokeData.data
      })
    }

    handleClick() {
        //该函数用来执行组件内部的事件，比如在这里就是nav组件菜单的导航点击事件
        // this.props.history.push('/')
    }

    handleTouchStart(e) {
      e.preventDefault()

      let touchobj = e.changedTouches[0]
      startX = touchobj.clientX

    }

    handleTouchEnd(e) {
      e.preventDefault()

      let touchobj = e.changedTouches[0]
      let touchXDelta = startX - touchobj.clientX

      if(touchXDelta > 0) {
        moveIndex = moveIndex > this.state.userInfo.courseList.length - 2 ? moveIndex : moveIndex + 1
      } else {
        moveIndex = moveIndex === 0 ? 0 : moveIndex - 1
      }

      this.setState({
        moveX: moveIndex * winWidth * -1
      })

    }

    render() {

        const { userInfo, moveX } = this.state

        let listStyle = {
          transform: `translateX(${moveX}px)`
        }

        return(
            <article className="user-page">
              <section className="info">
                <div className="info-box">
                  <div className="box-base">
                    <img className="thumb" src={userInfo.thumb} />
                    <div className="base">
                      <div className="name">{userInfo.nikeName}</div>
                      <div className="address">{userInfo.location}</div>
                    </div>
                  </div>
                  <div className="box-option"></div>
                </div>
              </section>
              <section className="content">
                <section className="content-box">
                  <div className="box-section">
                    <div className="box-name">
                      <i className="icon-price-tag"></i>
                      我的预约
                    </div>
                    <div className="box-arrow">
                      <i className="icon-i_arrow10_12"></i>
                    </div>
                  </div>
                  <div className="box-section">
                    <div className="box-name">
                      <i className="icon-price-tags"></i>
                      俱乐部课程
                    </div>
                    <div className="box-arrow">
                      <i className="icon-i_arrow10_12"></i>
                    </div>
                  </div>
                  <div className="box-section">
                    <div className="box-name">
                      <i className="icon-clock2"></i>
                      私人教练
                    </div>
                    <div className="box-arrow">
                      <i className="icon-i_arrow10_12"></i>
                    </div>
                  </div>
                  <div className="box-section">
                    <div className="box-name">
                      <i className="icon-credit-card"></i>
                      在线售卡
                    </div>
                    <div className="box-arrow">
                      <i className="icon-i_arrow10_12"></i>
                    </div>
                  </div>
                </section>
              </section>
              <section className="show" onTouchStart={ e => this.handleTouchStart(e)} onTouchEnd={ e => this.handleTouchEnd(e)}>
                <div className="list" style={listStyle}>
                  {
                    userInfo.courseList.map( (item, i) => {
                      return (
                        <div className="item" key={i}>
                          <div className="item-bg" style={{backgroundImage: `url(${item.course_cover})`}}></div>
                          <div className="item-content">
                            <div className="item-left">
                              <div className="content-title">{item.course_name}</div>
                              <div className="content-tips">{item.course_time} {item.course_date}</div>
                            </div>
                            <div className="item-right"></div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </section>
            </article>
        )
    }
}

UserPage.propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
}