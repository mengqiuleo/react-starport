/*
 * @Author: Pan Jingyi
 * @Date: 2022-12-31 16:18:38
 * @LastEditTime: 2023-01-01 17:44:53
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import 'uno.css'
import 'virtual:windi.css'

import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <App />
  </HashRouter>
)

export {default as Starport} from './components/StarPort/Starport'
export {default as FloatProxy} from './components/StarPort/FloatProxy'
export {default as FloatContainer} from './components/StarPort/FloatContainer'