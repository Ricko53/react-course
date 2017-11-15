import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './index.less'

import DetailDestine from './compontent/DetailDestine.js'

import mokeData from './mokeData.js'

let winWidth = window.innerWidth

export default class UserPage extends React.Component {

  constructor(props) {
    super(props);
    //构造函数用法
    //常用来绑定自定义函数，切记不要在这里或者组件的任何位置setState，state全部在reducer初始化，相信对开发的后期很有帮助
    //例子：this.myfunction = this.myfunction.bind(this)

    this.handelClickFunc = this.handelClickFunc.bind(this)
    this.closeDetailFunc = this.closeDetailFunc.bind(this)

    this.state = {
      userInfo: {},
      showDetail: false,
      baseData: {},
    }
  }

  componentWillMount() {
    console.log('destine page')
    this.setState({
      userInfo: mokeData.data
    })
  }

  handelClickFunc(e) {

    let curentDom = e.target
    let coverDom = curentDom.firstElementChild
    let image = coverDom.style.backgroundImage
    let coverClient = coverDom.getBoundingClientRect()
    let boxClient = curentDom.getBoundingClientRect()

    document.body.style.overflow = "hidden"

    this.setState({
      showDetail: true,
      baseData: {
        coverImage: image,
        coverClient: coverClient,
        boxClient: boxClient,
      }
    })
  }

  closeDetailFunc() {
    this.setState({
      showDetail: false,
    })
    
    document.body.style.overflow = "auto"        

  }

  render() {

    const { showDetail, userInfo, baseData } = this.state

    return(
      <article className="destine-page">
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
          <Link to="/" className="info-button">
            <i className="icon-user"></i>
          </Link>
        </section>
        <section className="destine-content">
          <div className="destine-list">
            {
              userInfo.courseList.map((item, i) => {
                return (
                  <section className="destine-item" key={item.course_id} onClick={e => this.handelClickFunc(e)}>
                    <div className="course-cover" style={{backgroundImage: `url(${item.course_cover})`}}></div>
                    <div className="course-info">
                      <div className="course-name">{item.course_name}</div>
                      <div className="course-date">{item.course_time} {item.course_date}</div>
                    </div>
                  </section>
                )
              })
            }
          </div>
        </section>
        <DetailDestine show={showDetail} info={baseData} closeDetail={this.closeDetailFunc} ></DetailDestine>
      </article>
    )
  }
}

UserPage.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}