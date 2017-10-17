import React from 'react'
import PropTypes from 'prop-types'

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
            <div>
              <h1>Course List Page</h1>
            </div>
        )
    }
}

CourseList.propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
}