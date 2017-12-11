// import React from 'react'
// import ReactDOM from 'react-dom'
// import { AppContainer } from 'react-hot-loader'

import dva from 'dva'
import FastClick from 'fastclick'
import createHistory from 'history/createBrowserHistory'
import createLoading from 'dva-loading'
import { createLogger } from 'redux-logger';

import model from '../models/app'
import UserPage from '../page/userPage'

FastClick.attach(document.body)

// const render = Component => {
//     return ReactDOM.render(
//         <AppContainer>
//           <Component />
//         </AppContainer>,
//         document.getElementById('root')
//     )
// }

// render(UserPage)

// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true,
  }),
  history: createHistory(),
  onAction: createLogger(),
  onError (error) {
    console.warn(error.message)
  },
})

// 2. Model
app.model(model)

// 3. Router
app.router(UserPage)

// 4. Start
app.start('#root')


