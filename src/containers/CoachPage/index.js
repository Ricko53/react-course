import React from 'react'
import classnames from 'classnames'

import './index.less'

export default class CoachPage extends React.Component {

    constructor(props) {
      super(props)

      this.state = {
        curentContent: 'class'
      }

      this.changeContainer = this.changeContainer.bind(this)
    }

    componentWillMount() {

    }

    changeContainer(con) {
      this.setState({
        curentContent: con,
      })
    }

    render() {

      let { curentContent } = this.state

      // <footer className="footer">
      //   © 2017, made with by BingZhou
      // </footer>

      return(
        <section className="coach-page">
          <section className="coach-header" style={{backgroundImage: `url(http://static1.keepcdn.com/avatar/2017/10/26/17/644c740dac007c38a3134f84950a4ba3fc035ceb.jpg?imageMogr2/thumbnail/96x)`}}></section>
          <section className="coach-main">
            <div className="profile-content">
              <div className="container">
                <div className="profile">
                  <img className="profile-img" src="http://static1.keepcdn.com/avatar/2017/10/26/17/644c740dac007c38a3134f84950a4ba3fc035ceb.jpg?imageMogr2/thumbnail/96x" />
                  <div className="profile-name">
                    <h3 className="title">Humble</h3>
                    <h6>Kendrick Lamar on DAMN.</h6>
                  </div>
                </div>
                <div className="nav">
                  <div className="nav-pills">
                    <div className={classnames("item", {"active": curentContent === 'class' })} onClick={e => this.changeContainer('class')}>
                      <i className="icon-clock2"></i>
                      课程
                    </div>
                    <div className={classnames("item", {"active": curentContent === 'reserve' })} onClick={e => this.changeContainer('reserve')}>
                      <i className="icon-price-tag"></i>
                      预约
                    </div>
                    <div className={classnames("item", {"active": curentContent === 'nember' })} onClick={e => this.changeContainer('nember')}>
                      <i className="icon-users"></i>
                      成员
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </section>
        </section>
      )
    }
}