import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import FastClick from 'fastclick'

import AdminPage from '../page/adminPage'

FastClick.attach(document.body)

const render = Component => {
    return ReactDOM.render(
        <AppContainer>
          <Component />
        </AppContainer>,
        document.getElementById('root')
    )
}

render(AdminPage)

