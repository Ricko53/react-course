import React from 'react'
import PropTypes from 'prop-types'

import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import TextField from 'material-ui/TextField'

import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'

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

    let dialogButtons = [
      <RaisedButton label="取消" onClick={this.handleCloseDialog} />,
      <RaisedButton label="确认" backgroundColor={"#7b1fa2"} style={sublimeButton} labelColor={'#FFFFFF'} />
    ]

    // floatingLabelText="课程名称"
    // floatingLabelFocusStyle={{color: '#7b1fa2'}}
    // underlineFocusStyle={{borderColor: '#7b1fa2'}}

    return(
      <section className="course-manage">
        <div className="course-option">
          <div className="option-left"></div>
          <div className="option-right">
            <FloatingActionButton mini={true} backgroundColor={"#7b1fa2"} onClick={this.handleOpenDialog}>
              <ContentAdd />
            </FloatingActionButton>
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

        <Dialog
          title={"创建新课程"}
          actions={dialogButtons}
          modal={false}
          open={open}
          onRequestClose={this.handleCloseDialog}
          autoScrollBodyContent={false}
        >
          <div className="creat-course-content">
            <section className="course-input">
              <label className="input-name">课程名称</label>
              <TextField
                hintText="瑜伽体验课程"
              />
            </section>
            <section className="course-input">
              <label className="input-name">封面图片</label>
              <TextField
                hintText="http://images.cdn.com/image.jpg"
              />
            </section>
            <section className="course-input">
              <label className="input-name">课程日期</label>
              <DatePicker 
                hintText="2018-1-1" 
                mode="landscape"
                value={date}
                onChange={this.handleChangeDatePicker}
              />
            </section>
            <section className="course-input">
              <label className="input-name">开始时间</label>
              <TimePicker
                format="24hr"
                hintText="7:30"
                value={startTime}
                onChange={(event, date) => this.handleChangeInputValue('startTime', date)}
              />
            </section>
            <section className="course-input">
              <label className="input-name">结束时间</label>
              <TimePicker
                format="24hr"
                hintText="9:30"
                value={endTime}
                onChange={(event, date) => this.handleChangeInputValue('endTime', date)}
              />
            </section>
            <section className="course-input">
              <label className="input-name">课程教练</label>
            </section>
            <section className="course-input course-input-max">
              <label className="input-name">课程介绍</label>
              <textarea className="course-textarea"></textarea>
            </section>
          </div>
        </Dialog>
      </section>
    )
  }
}