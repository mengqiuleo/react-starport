/*
 * @Author: Pan Jingyi
 * @Date: 2022-12-31 16:18:38
 * @LastEditTime: 2023-01-01 03:32:20
 */
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import Router from './router'
import img from './data'

interface IProps {
  children?: ReactNode
}

const App: FC<IProps> = () => {
  return (
    <div>
      <Router />
      <div>
        {
          img.map((item: any) => {
            return <img src={item}></img>
          })
        }
      </div>
    </div>
  )
}

export default memo(App)
