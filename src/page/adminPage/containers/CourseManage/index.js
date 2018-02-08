import React from 'react'
import PropTypes from 'prop-types'

import './index.less'

import fakeData from './mokeData'

export default class CourseManage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      courseList: fakeData.data,
      open: false,
      date: null,
      startTime: null,
      endTime: null,
      title: '',
      imgUrl: '',
      coach: '',
      content: '',
    }

    this.handleCloseDialog = this.handleCloseDialog.bind(this)
    this.handleChangeInputValue = this.handleChangeInputValue.bind(this)
  }

  componentWillMount() {
  }

  handleCloseDialog() {
    this.setState({
      open: false
    })
  }

  handleOpenDialog = () => {
    this.setState({
      open: true
    })
  }

  handleChangeTimePicker(name, date) {
    console.log(arguments, arguments.length)
    this.setState({
      [name]: date
    })
  }

  handleChangeDatePicker = (event, date) => {
    this.setState({
      date: date
    })
  }

  handleChangeInputValue(name, val) {
    this.setState({
      [name]: date
    })
  }

  render() {

    let { courseList, open, date, startTime, endTime, imgUrl, coach, content } = this.state

    let sublimeButton = {
      color: '#FFFFFF',
      marginLeft: 20,
    }

    // floatingLabelText="课程名称"
    // floatingLabelFocusStyle={{color: '#7b1fa2'}}
    // underlineFocusStyle={{borderColor: '#7b1fa2'}}

    return(
      <section className="course-manage">
        <div className="course-option">
          <div className="option-left"></div>
          <div className="option-right">
          </div>
        </div>
        <div className="row-flex flex-wrap">
          { courseList.map( (item, i) => {
              return (
                <div className="col-md-3" key={item.course_id}>
                  <div className="card">
                    <div className="card-image" style={{backgroundImage: `url(${item.course_cover})`}}>
                    </div>
                    <div className="card-content">
                      <h4 className="title">{item.course_name}</h4>
                      <div className="coach">
                        <img className="thumb" src={item.course_coach.thumb} />
                        <p className="name">{item.course_coach.name}</p>
                      </div>
                    </div>
                    <div className="card-footer">
                      <div className="stats">
                        <i className="icon-clock"></i>
                        {item.course_time} {item.course_date}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </section>
    )
  }
}