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

        console.log(this.props)

        return(
            <div>
              <h1>User Info Page</h1>
            </div>
        )
    }
}

UserPage.propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
}