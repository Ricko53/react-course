import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { connect } from 'dva'

import Utils from 'utils/utils'
import DetailDestine from './compontent/DetailDestine.js'

import './index.less'

let winWidth = window.innerWidth

class UserDestine extends React.Component {

  constructor(props) {
    super(props);

    this.handelClickFunc = this.handelClickFunc.bind(this)
    this.closeDetailFunc = this.closeDetailFunc.bind(this)
    this.cancelAppointment = this.cancelAppointment.bind(this)

    this.state = {
      showDetail: false,
      baseData: {},
      courseDetail: {},
    }
  }

  componentWillMount() {
  }

  handelClickFunc(e, index) {

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
      },
      courseDetail: this.props.app.userInfo.courses[index],
    })
  }

  closeDetailFunc() {
    this.setState({
      showDetail: false,
    })
    
    document.body.style.overflow = "auto"
  }

  cancelAppointment(cid) {
    return this.props.dispatch({type: 'app/cancelCourse', payload: cid})
  }

  render() {

    const { app } = this.props
    const { userInfo } = app
    const { showDetail, baseData, courseDetail } = this.state

    return(
      <article className="destine-page">
        <section className="info">
          <div className="info-box">
            <div className="box-base">
              <img className="thumb" src={userInfo.headimgurl} />
              <div className="base">
                <div className="name">{userInfo.nickname}</div>
                <div className="address">{userInfo.city} {userInfo.country}</div>
              </div>
            </div>
            <div className="box-option"></div>
          </div>
          <Link to="/user" className="info-button">
            <i className="icon-user"></i>
          </Link>
        </section>
        <section className="destine-content">
          <div className="destine-list">
            {
              userInfo.courses.map((item, i) => {
                return (
                  <section className="destine-item" key={item.id} onClick={e => this.handelClickFunc(e, i)}>
                    <div className="course-cover" style={{backgroundImage: `url(${item.course_cover})`}}></div>
                    <div className="course-info">
                      <div className="course-name">{item.course_name}</div>
                      <div className="course-date">{Utils.getWeek(item.course_date_start)} {Utils.format('hh:mm', item.course_date_start)} - {Utils.format('hh:mm', item.course_date_end)}</div>
                    </div>
                  </section>
                )
              })
            }
          </div>
        </section>
        <DetailDestine 
          show={showDetail} 
          info={baseData} 
          courseDetail={courseDetail} 
          closeDetail={this.closeDetailFunc} 
          cancelAppointment={this.cancelAppointment} ></DetailDestine>
      </article>
    )
  }
}

UserDestine.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

export default connect(app => app)(UserDestine)