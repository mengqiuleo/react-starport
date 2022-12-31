/*
 * @Author: Pan Jingyi
 * @Date: 2022-12-31 16:18:38
 * @LastEditTime: 2023-01-01 03:23:57
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import 'uno.css'

import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <App />
  </HashRouter>
)
