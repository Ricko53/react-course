import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import loginPage from '../page/loginPage'

import 'style/main.less'
import 'style/style.less'
import 'assets/css/material-kit.css'

const render = Component => {
    return ReactDOM.render(
        <AppContainer>
          <Component />
        </AppContainer>,
        document.getElementById('root')
    )
}

render(loginPage)