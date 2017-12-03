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
    }

    this.handleCloseDialog = this.handleCloseDialog.bind(this)
    this.handleChangeTimePicker = this.handleChangeTimePicker.bind(this)
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
    console.log(event, date)
    this.setState({
      date: date
    })
  }

  render() {

    let { courseList, open, date, startTime, endTime } = this.state

    let sublimeButton = {
      color: '#FFFFFF',
      marginLeft: 20,
    }

    let dialogButtons = [
      <RaisedButton label="取消" onClick={this.handleCloseDialog} />,
      <RaisedButton label="确认" backgroundColor={"#7b1fa2"} style={sublimeButton} labelColor={'#FFFFFF'} />
    ]

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
          actions={dialogButtons}
          modal={false}
          open={open}
          onRequestClose={this.handleCloseDialog}
          autoScrollBodyContent={false}
        >
          <div className="creat-course-content">
            <section className="course-input">
              <TextField
                floatingLabelText="课程名称"
                floatingLabelFocusStyle={{color: '#7b1fa2'}}
                underlineFocusStyle={{borderColor: '#7b1fa2'}}
              />
            </section>
            <section className="course-input">
              <DatePicker 
                hintText="日期" 
                mode="landscape"
                value={date}
                onChange={this.handleChangeDatePicker}
              />
            </section>
            <section className="course-input">
              <TimePicker
                format="24hr"
                hintText="开始时间"
                value={startTime}
                onChange={(event, date) => this.handleChangeTimePicker('startTime', date)}
              />
            </section>
            <section className="course-input">
              <TimePicker
                format="24hr"
                hintText="结束时间"
                value={endTime}
                onChange={(event, date) => this.handleChangeTimePicker('endTime', date)}
              />
            </section>
          </div>
        </Dialog>
      </section>
    )
  }
}