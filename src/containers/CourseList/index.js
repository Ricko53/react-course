import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import FakeModel from './compontent/FakeModel.js'
import CourseDetail from './compontent/CourseDetail.js'

import mokeDate from './mokeDate.js'

import './index.less'

function node_after( sib )
{
  while ((sib = sib.nextSibling)) {
    if (!is_ignorable(sib)) return sib;
  }
  return null;
}

function is_ignorable( nod )
{
  return ( nod.nodeType == 8) || // 注释节点
         ( (nod.nodeType == 3) && is_all_ws(nod) ); // 仅含空白符的文字节点
}

let winWidth = window.innerWidth
let previous = 0

export default class CourseList extends React.Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this)
        this.closeDetailFunc = this.closeDetailFunc.bind(this)
        this.handDateFunc = this.handDateFunc.bind(this)
        this.transitionInFunc = this.transitionInFunc.bind(this)

        this.state = {
          showModel: false,
          baseInfo: {},
          showDetail: false,
          closeDetail: false,
          courseList: [],
          currentDate: 0,
          listX: 0,
          enterClass: 'entering'
        }
    }

    componentWillMount() {
      this.setState({
        courseList: mokeDate.data.dateList
      })
      this.transitionInFunc()
    }

    transitionInFunc() {
      this.setState({
        enterClass: 'entering'
      })

      setTimeout(()=>{
        this.setState({
          enterClass: 'entered'
        })
      })
    }

    handDateFunc(e, index) {
      // calendar list transform x
      if(e.target.offsetLeft > winWidth / 2 ) {

          let curPosition = e.target.getBoundingClientRect()

          let moveX = this.state.listX + ( curPosition.x - winWidth / 2 + 40 )

          this.state.listX = moveX

      } else {
        this.state.listX = 0
      }

      this.setState({
        currentDate: index,
      })

      this.transitionInFunc()
    }

    handleClick(e) {
      let curentDom = e.target
      let image = curentDom.style.backgroundImage
      let coverClient = curentDom.getBoundingClientRect()
      let infoClient = node_after(curentDom).getBoundingClientRect()

      document.body.style.overflow = "hidden"

      this.setState({
        showModel: true,
        baseInfo: {
         coverImage: image,
         coverClient,
         infoClient
        }
      })

       setTimeout(()=>{
         this.setState({
           showDetail: true,
         })
       }, 500)
    }

    closeDetailFunc() {
      this.setState({
        closeDetail: true,
        showDetail: false,
      })

      setTimeout(() => {
        this.setState({
          showModel: false,
          closeDetail: false,
        })
        document.body.style.overflow = "auto"        
      }, 300)
    }

    render() {

        let { courseList, currentDate, listX, enterClass } = this.state

        let listStyle = {
          transform: `translateX(${listX * -1}px)`,
        }

        let curList = courseList[currentDate].courseList

        return(
          <article className="course-page">
            <section className="calendar">
              <div className="calendar-srcoll">
                <div className="calendar-list" style={listStyle}>
                {
                  courseList.map( ( item ,i ) => {
                    return <div key={i} onClick={ e => this.handDateFunc(e, i)} className={classnames("calendar-item", {"curent-item" : currentDate === i})}>{item.dateName}</div> 
                  })
                }
                </div>
              </div>
              <div className="calendar-date">October 30th</div>
            </section>
            <section className="course-content">
              <section className={classnames("course-list", enterClass)}>
                {
                  curList.map((item, i) => {
                    return (
                      <section className="course-item" key={i}>
                        <div className="item-cover" onClick={ e => this.handleClick(e, item.course_id)} style={{backgroundImage:`url(${item.course_cover})`}}>
                          <div className="cover-info">
                            <div className="cover-name">{item.course_name}</div>
                            <div className="cover-date">
                              <i className="icon-clock"></i>
                              {item.course_date}
                            </div>
                          </div>
                        </div>
                        <div className="item-info">
                          <div className="item-left">
                            <img className="item-thumb" src={item.course_coach.thumb} />
                            <div className="detail">
                              <div className="name">{item.course_coach.name}</div>
                              <p className="desc">{item.course_coach.desc}</p>
                            </div>
                          </div>
                          <div className="item-right"></div>
                        </div>
                      </section>
                    )
                  })
                }
              </section>
            </section>
            <FakeModel show={this.state.showModel} info={this.state.baseInfo} close={this.state.closeDetail}></FakeModel>
            <CourseDetail showDetail={this.state.showDetail} info={this.state.baseInfo} closeDetail={this.closeDetailFunc}></CourseDetail>
          </article>
        )
    }
}

CourseList.propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
}