import React from 'react'
import ReactDOM from 'react-dom'

import loginPage from '../page/loginPage'

import 'style/main.less'
import 'style/style.less'
import 'assets/css/material-kit.css'

const render = Component => {
    return ReactDOM.render(
        <Component />,
        document.getElementById('root')
    )
}

render(loginPage)