import React from 'react'
import PropTypes from 'prop-types'

import FakeModel from './compontent/FakeModel.js'
import CourseDetail from './compontent/CourseDetail.js'

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

export default class CourseList extends React.Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this)
        this.closeDetailFunc = this.closeDetailFunc.bind(this)

        this.state = {
          showModel: false,
          baseInfo: {},
          showDetail: false,
          closeDetail: false,
        }
    }

    componentWillMount() {

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
      }, 600)
    }

    render() {

        return(
          <article className="course-page">
            <section className="calendar">
              <div className="calendar-list">
                <div className="calendar-item">Monday</div>
                <div className="calendar-item">Tuesday</div>
                <div className="calendar-item curent-item">Wednesday</div>
                <div className="calendar-item">Thursday</div>
                <div className="calendar-item">Firday</div>
                <div className="calendar-item">Saturday</div>
                <div className="calendar-item">Sunday</div>
              </div>
              <div className="calendar-date">October 30th</div>
            </section>
            <section className="course-content">
              <section className="course-list">
                <section className="course-item" >
                  <div className="item-cover" onClick={ e => this.handleClick(e)} style={{backgroundImage:"url(https://static1.keepcdn.com/misc/2016/06/02/23/554474e4c9000000.jpg)"}}>
                    <div className="cover-info">
                      <div className="cover-name">邹市明拳击燃脂</div>
                      <div className="cover-date">
                        <i className="icon-clock"></i>
                        9:30 - 11:00
                      </div>
                    </div>
                  </div>
                  <div className="item-info">
                    <div className="item-left">
                      <img className="item-thumb" src="http://static1.keepcdn.com/avatar/2017/10/26/17/644c740dac007c38a3134f84950a4ba3fc035ceb.jpg?imageMogr2/thumbnail/96x" />
                      <div className="detail">
                        <div className="name">Humble</div>
                        <p className="desc">Kendrick Lamar on DAMN.</p>
                      </div>
                    </div>
                    <div className="item-right"></div>
                  </div>
                </section>

                <section className="course-item">
                  <div className="item-cover" onClick={ e => this.handleClick(e)} style={{backgroundImage:"url(http://static1.keepcdn.com/2017/10/13/10/1507862317459_750x700.jpg)"}}>
                    <div className="cover-info">
                      <div className="cover-name">李现 HIIT燃脂挑战</div>
                      <div className="cover-date">
                        <i className="icon-clock"></i>
                        4:30 - 6:00
                      </div>
                    </div>
                  </div>
                  <div className="item-info">
                    <div className="item-left">
                      <img className="item-thumb" src="http://static1.keepcdn.com/avatar/2017/10/26/17/644c740dac007c38a3134f84950a4ba3fc035ceb.jpg?imageMogr2/thumbnail/96x" />
                      <div className="detail">
                        <div className="name">Humble</div>
                        <p className="desc">Kendrick Lamar on DAMN.</p>
                      </div>
                    </div>
                    <div className="item-right"></div>
                  </div>
                </section>

                <section className="course-item">
                  <div className="item-cover" onClick={ e => this.handleClick(e)} style={{backgroundImage:"url(https://static1.keepcdn.com/2016/11/08/15/1478588604301_750x700.jpg)"}}>
                    <div className="cover-info">
                      <div className="cover-name">邹市明战斗跳绳</div>
                      <div className="cover-date">
                        <i className="icon-clock"></i>
                        7:30 - 9:00
                      </div>
                    </div>
                  </div>
                  <div className="item-info">
                    <div className="item-left">
                      <img className="item-thumb" src="http://static1.keepcdn.com/avatar/2017/10/26/17/644c740dac007c38a3134f84950a4ba3fc035ceb.jpg?imageMogr2/thumbnail/96x" />
                      <div className="detail">
                        <div className="name">Humble</div>
                        <p className="desc">Kendrick Lamar on DAMN.</p>
                      </div>
                    </div>
                    <div className="item-right"></div>
                  </div>
                </section>
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