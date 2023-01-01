/*
 * @Author: Pan Jingyi
 * @Date: 2022-12-31 16:18:38
 * @LastEditTime: 2023-01-01 17:31:41
 */
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import Router from './router'
import imgs from './data'

import TheNav from './components/TheNav'
import Starport from './components/StarPort/Starport'
import TheImage from './components/TheImage'
import Info from './components/Info'
import FloatContainer from './components/StarPort/FloatContainer'

interface IProps {
  children?: ReactNode
}

const App: FC<IProps> = () => {
  return (
    <Starport>
      <div className='bg-white w-full text-[#374751] h-full'>
        <TheNav />
        <div h='full'>
          <Router />
        </div>
      </div>
      {/* FloatContainer组件用来包裹所有想要不被销毁的组件 */}
      <FloatContainer slot={() => <Info />} port='13' />
      {imgs.map((img, index) => {
        return (
          <FloatContainer
            key={index}
            slot={() => <TheImage src={img} />}
            port={index + 1 + ''}
          />
        )
      })}
    </Starport>
  )
}

export default memo(App)
