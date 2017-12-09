import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import Fetch from 'utils/fetch'
import Config from 'config'

import FakeModel from './compontent/FakeModel.js'
import CourseDetail from './compontent/CourseDetail.js'

import './index.less'

const OTOA = o => Object.keys(o).map( v => o[v] )

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

export default class CourseList extends React.Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this)
        this.closeDetailFunc = this.closeDetailFunc.bind(this)
        this.handDateFunc = this.handDateFunc.bind(this)

        this.state = {
          showModel: false,
          baseInfo: {},
          showDetail: false,
          closeDetail: false,
          courseList: [],
          currentDate: 0,
          listX: 0,
          courseInfo: {},
        }
    }

    static contextTypes = {
      router: PropTypes.object.isRequired
    }

    componentWillMount() {

      Fetch(Config.COURSE_LIST).then( res => {
        this.setState({
          courseList: OTOA(res.dateList)
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

    }

    handleClick(e, cid) {
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
         infoClient,
        }
      })

      setTimeout( () => {
        Fetch(Config.COURSE_DETAIL + '?id=' + cid).then(res => {
          this.setState({
            courseInfo: res.course,
            showDetail: true,
          })
        })
      }, 200)

       // setTimeout(()=>{
       //   this.setState({
       //     showDetail: true,
       //   })

        // this.context.router.history.push('/courseList/1')

       // }, 500)
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

        let { courseList, currentDate, listX } = this.state

        let listStyle = {
          transform: `translateX(${listX * -1}px)`,
        }

        if(courseList.length === 0){
          return (
            <div className="loading">
              <svg viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" stroke="#7b1fa2">    
                <g fill="none" fillRule="evenodd" strokeWidth="2">        
                  <circle cx="22" cy="22" r="1">            
                    <animate attributeName="r" begin="0s" dur="1.4s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite" />            
                    <animate attributeName="stroke-opacity" begin="0s" dur="1.4s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite" />        
                  </circle>        
                  <circle cx="22" cy="22" r="1">            
                    <animate attributeName="r" begin="-0.9s" dur="1.4s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite" />            
                    <animate attributeName="stroke-opacity" begin="-0.9s" dur="1.4s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite" />        
                  </circle>    
                </g>
              </svg>
            </div>
          )
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
              <div className="calendar-date">{courseList[currentDate].date}</div>
            </section>
            <section className="course-content">
              <section className="course-list">
                <CSSTransitionGroup 
                  transitionName="course"
                  transitionLeave={false}
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={100}
                >
                {
                  curList.map((item, i) => {
                    return (
                      <section className="course-item" key={item.id}>
                        <div className="item-cover" onClick={ e => this.handleClick(e, item.id)} style={{backgroundImage:`url(${item.course_cover})`}}>
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
                            <img className="item-thumb" src={item.course_coach.headimgurl} />
                            <div className="detail">
                              <div className="name">{item.course_coach.nickname}</div>
                              <p className="desc">{item.course_coach.introduce}</p>
                            </div>
                          </div>
                          <div className="item-right"></div>
                        </div>
                      </section>
                    )
                  })
                }
                </CSSTransitionGroup>
              </section>
            </section>
            <FakeModel show={this.state.showModel} info={this.state.baseInfo} close={this.state.closeDetail}></FakeModel>
            <CourseDetail showDetail={this.state.showDetail} info={this.state.baseInfo} courseInfo={this.state.courseInfo} closeDetail={this.closeDetailFunc}></CourseDetail>
          </article>
        )
    }
}

CourseList.propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
}