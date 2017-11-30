import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import FastClick from 'fastclick'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AdminPage from '../page/adminPage'

FastClick.attach(document.body)

const render = Component => {
    return ReactDOM.render(
        <AppContainer>
          <MuiThemeProvider>
            <Component />
          </MuiThemeProvider>
        </AppContainer>,
        document.getElementById('root')
    )
}

render(AdminPage)

