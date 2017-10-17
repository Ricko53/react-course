import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import FastClick from 'fastclick'

import UserPage from '../page/userPage'

FastClick.attach(document.body)

const render = Component => {
    return ReactDOM.render(
        <AppContainer>
          <Component />
        </AppContainer>,
        document.getElementById('root')
    )
}

render(UserPage)

// if(module.hot) {
//     module.hot.accept('../page/userPage', () => {
//         const NextRootContainer = require('../page/userPage').default
//         render(NextRootContainer)
//     })
// }


