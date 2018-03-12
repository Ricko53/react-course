// import React from 'react'
// import ReactDOM from 'react-dom'
import dva from 'dva'
import createLoading from 'dva-loading'
import createHistory from 'history/createBrowserHistory'
import { createLogger } from 'redux-logger';

// import { AppContainer } from 'react-hot-loader'

import model from '../page/adminPage/models'
import AdminPage from '../page/adminPage'

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

app.model(model)

app.router(AdminPage)

app.start('#root')

// const render = Component => {
//     return ReactDOM.render(
//         <AppContainer>
//             <Component />
//         </AppContainer>,
//         document.getElementById('root')
//     )
// }

// render(AdminPage)

