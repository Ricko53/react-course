import React from 'react'
import PropTypes from 'prop-types'

import './index.less'

export default class UserPage extends React.Component {

    constructor(props) {
        super(props);
        //构造函数用法
        //常用来绑定自定义函数，切记不要在这里或者组件的任何位置setState，state全部在reducer初始化，相信对开发的后期很有帮助
        //例子：this.myfunction = this.myfunction.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    componentWillMount() {

    }

    handleClick() {
        //该函数用来执行组件内部的事件，比如在这里就是nav组件菜单的导航点击事件
        // this.props.history.push('/')
    }

    render() {
        // const { } = this.props
        //还可以通过自定义样式传递给组件

        // <img className="item-bg" src="http://static1.keepcdn.com/2017/10/13/10/1507862874726_750x700.jpg" />

        console.log(this.props)

        return(
            <article className="user-page">
              <section className="info">
                <img className="info-bg" src='http://test.img1.maka.im/user/1092434/thumb/25c6b52e9ea82f02c36ad3aca3982cac.jpg?x-oss-process=image/resize,w_5' />
                <div className="info-box">
                  <div className="box-base">
                    <img className="thumb" src='http://test.img1.maka.im/user/1092434/thumb/25c6b52e9ea82f02c36ad3aca3982cac.jpg?x-oss-process=image/resize,w_100' />
                    <div className="base">
                      <div className="name">Steve Nash</div>
                      <div className="address">New York, USA</div>
                    </div>
                  </div>
                  <div className="box-option"></div>
                </div>
              </section>
              <section className="content">
                <section className="content-box">
                  <div className="box-section">
                    <div className="box-left">
                      <div className="box-collections">231</div>
                      <p className="box-name">Curated collections</p>
                    </div>
                    <div className="box-right"></div>
                  </div>
                  <div className="box-section">
                    <div className="box-left">
                      <div className="box-follows-list">
                        <img className="follows-item" src="http://static1.keepcdn.com/avatar/2017/10/26/17/644c740dac007c38a3134f84950a4ba3fc035ceb.jpg?imageMogr2/thumbnail/96x" />
                        <img className="follows-item" src="http://static1.keepcdn.com/avatar/2017/10/03/14/9fe9847048da659bf645749e75b49c840f348be9.jpg?imageMogr2/thumbnail/96x" />
                        <img className="follows-item" src="http://static1.keepcdn.com/avatar/2017/10/26/13/0545ac7e18565ede040232294cfc6efdc053db0a.jpg?imageMogr2/thumbnail/96x" />
                        <img className="follows-item" src="http://static1.keepcdn.com/avatar/2016/11/29/08/a659895c477be622a4855b4d26c577b50409c3dd.jpg?imageMogr2/thumbnail/96x" />
                      </div>
                      <p className="box-name">423.8K FOLLOWERS</p>
                    </div>
                    <div className="box-right">
                      <div className="box-button">
                        <i className="icon-price-tag"></i>
                      </div>
                    </div>
                  </div>
                </section>
              </section>
              <section className="show">
                <div className="list">
                  <div className="item">
                    <div className="item-bg"></div>
                    <div className="item-content">
                      <div className="item-left">
                        <div className="content-tips">FEATURED</div>
                        <div className="content-title">Art & Design</div>
                      </div>
                      <div className="item-right"></div>
                    </div>
                  </div>
                </div>
              </section>
            </article>
        )
    }
}

UserPage.propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
}