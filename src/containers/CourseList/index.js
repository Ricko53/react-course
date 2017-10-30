import React from 'react'
import PropTypes from 'prop-types'

import './index.less'

export default class CourseList extends React.Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this)
    }

    componentWillMount() {

    }

    handleClick() {
        //该函数用来执行组件内部的事件，比如在这里就是nav组件菜单的导航点击事件
        // this.props.history.push('/')
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
                <section className="course-item">
                  <div className="item-cover" style={{backgroundImage:"url(https://static1.keepcdn.com/misc/2016/06/02/23/554474e4c9000000.jpg)"}}></div>
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
                  <div className="item-cover" style={{backgroundImage:"url(http://static1.keepcdn.com/2017/10/13/10/1507862317459_750x700.jpg)"}}></div>
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
                  <div className="item-cover" style={{backgroundImage:"url(https://static1.keepcdn.com/2016/11/08/15/1478588565783_750x700.jpg)"}}></div>
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
          </article>
        )
    }
}

CourseList.propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
}